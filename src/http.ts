import { config } from "./config";
import type { Character, Cooldown, DataPage, DataPageReq } from "./types";
import { getUnknownErrorText, log, pluralize, pp, stringify, stripUndefined } from "./util";

type SupportedMethod = "GET" | "POST";
type HttpHeaders = { [key: string]: string | undefined };

const defaultHeaders: HttpHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearer ${config.apiToken}`,
};

function replacePathTokens(template: string) {
  const path = template.replaceAll(/\{name\}/g, config.name);
  return path;
}

// biome-ignore lint/suspicious/noExplicitAny: String() accepts any
function getUrl(templatePath: string, query?: { [key: string]: any }) {
  const path = replacePathTokens(templatePath);
  const queryStr = getQueryString(query);
  const url = config.apiHost + path + queryStr;
  return url;
}

// biome-ignore lint/suspicious/noExplicitAny: String() accepts any
function getQueryString(query?: { [key: string]: any }) {
  const params = new URLSearchParams(stringify(stripUndefined(query)));
  let str = params.toString();
  if (str.length > 0) str = `?${str}`;
  return str;
}

interface MayHaveCooldown {
  cooldown?: Cooldown;
}

interface MayHaveCharacter {
  character?: Character;
}

interface MayHaveData<T> {
  data?: T;
}

interface ApiErrorResponseBody {
  error: {
    code: number;
    message: string;
  };
}

type CallOptions = {
  /** API uses only GET and POST */
  method: SupportedMethod;
  /** The tokenized path, ie. `/my/{name}/action/move` */
  path: string;
  // biome-ignore lint/suspicious/noExplicitAny: String() accepts any
  query?: { [key: string]: any };
  headers?: HttpHeaders;
  // biome-ignore lint/suspicious/noExplicitAny: JSON.stringify() accepts any
  body?: any;
  /** not-ok (4xx and 5xx) HTTP status codes which should NOT throw an exception */
  notThrowable?: number[];
};

/** Call the API, wait for cooldown, and return the data property extracted from the body */
export async function actionCall<T extends MayHaveCooldown & MayHaveCharacter>(callerName: string, opts: CallOptions) {
  const response = await request(callerName, opts);
  const data = await handleResponse<T>(callerName, response, opts);
  return data;
}

/** Make a request and return a Response */
export async function request(callerName: string, opts: CallOptions) {
  const fullOpts: Omit<FetchRequestInit, "body"> & { body?: string } = {
    method: opts.method,
    headers: stripUndefined({ ...defaultHeaders, ...opts.headers }),
    body: opts?.body ? JSON.stringify(opts.body) : undefined,
  };

  try {
    const path = replacePathTokens(opts.path) + getQueryString(opts.query);
    if (config.logHttpRequests) log(callerName, `Request: ${fullOpts.method} ${path} ${pp(opts.body)}`);
    const url = getUrl(opts.path, opts.query);
    const response = await fetch(url, fullOpts);
    return response;
  } catch (error: unknown) {
    throw new Error(getUnknownErrorText(error, "calling API"));
  }
}

/** API response handler. Waits for any cooldown and returns the body */
export async function handleResponse<T extends MayHaveCooldown & MayHaveCharacter>(
  callerName: string,
  response: Response,
  opts: CallOptions,
) {
  if (!response.ok) {
    if (opts.notThrowable?.includes(response.status)) await warnNotOkResponse(response.clone(), opts, callerName);
    else await throwNotOkResponse(response, opts);
  }
  try {
    const body = (await response.json()) as MayHaveData<T>;
    if (config.logHttpResponses) logHttpResponse(callerName, structuredClone(body));
    await handleCooldown<T>(callerName, body);
    if (response.ok && !body.data) throw new Error("Didn't receive data property in ok response body?");
    return body.data;
  } catch (error: unknown) {
    throw new Error(getUnknownErrorText(error, "handling response"));
  }
}

/** Waits for a cooldown if specified in the response data */
async function handleCooldown<T extends MayHaveCooldown>(callerName: string, body: MayHaveData<T>) {
  const cooldown = body?.data?.cooldown;
  if (cooldown) {
    const { total_seconds: totalSeconds, reason } = cooldown;
    log(callerName, `Cooldown ${totalSeconds}s (${reason})...`, { newLine: false });
    log(
      callerName,
      await new Promise((res) => {
        setTimeout(res, totalSeconds * 1_000, [" complete."]);
      }),
      { prefix: false },
    );
  }
}

/** Call the API for a DataPage and return the whole body (for page handling) */
export async function pageCall<T extends DataPage>(callerName: string, opts: CallOptions) {
  const response = await request(callerName, opts);
  const body: T = await handlePageResponse<T>(callerName, response, opts);
  return body;
}

/** API response handler for DataPages */
async function handlePageResponse<T extends DataPage>(callerName: string, response: Response, opts: CallOptions) {
  if (!response.ok) await throwNotOkResponse(response, opts);
  try {
    const body = (await response.json()) as T;
    if (!body) throw new Error("Didn't receive a response body?");
    if (!body.data) throw new Error("Didn't receive data property in response body?");
    return body;
  } catch (error: unknown) {
    throw new Error(getUnknownErrorText(error, "handling response"));
  }
}

/** Page-handling wrapper for collecting all matching records across multiple data pages */
export async function handlePaging<T, R extends DataPageReq | undefined>(
  callerName: string,
  getPageFn: (query: DataPageReq) => Promise<DataPage<T>>,
  query?: Omit<NonNullable<R>, "page" | "size">,
) {
  const fullQuery: DataPageReq & { page: number } = { ...query, size: 100, page: 1 };
  const items: T[] = [];
  let body: DataPage<T>;

  do {
    body = await getPageFn(fullQuery);
    items.push(...body.data);
    fullQuery.page++;
  } while (body.page && body.pages && body.pages > body.page);

  if (config.logHttpResponses)
    log(
      callerName,
      `Returned ${items.length} item${pluralize(items)}${
        body.page && body.page > 1 ? ` over ${body.page} pages` : ""
      }: ${pp(items)}`,
    );

  return items;
}

/** Call the API for info (not requiring a cooldown) and return the complete response body */
export async function infoCall<T>(callerName: string, opts: CallOptions) {
  const response = await request(callerName, opts);
  const body = await handleInfoResponse<T>(callerName, response, opts);
  return body;
}

/** API response handler for info calls (not requiring a cooldown) */
async function handleInfoResponse<T>(callerName: string, response: Response, opts: CallOptions) {
  if (!response.ok) await throwNotOkResponse(response, opts);
  try {
    const body = (await response.json()) as T;
    if (config.logHttpResponses) log(callerName, `Response: ${pp(body)}`);
    if (!body) throw new Error("Didn't receive a response body?");
    return body;
  } catch (error: unknown) {
    throw new Error(getUnknownErrorText(error, "handling response"));
  }
}

async function throwNotOkResponse(response: Response, opts: CallOptions, callerName?: string) {
  const errorText = await getHttpErrorText(response, opts, callerName);
  const bodyLog = opts.body ? `\nRequest body: ${pp(opts.body)}` : "";
  throw new Error(errorText + bodyLog);
}

async function warnNotOkResponse(response: Response, opts: CallOptions, callerName: string) {
  const errorText = await getHttpErrorText(response, opts, callerName);
  log(callerName, errorText, { logFn: console.warn });
}

async function getHttpErrorText(response: Response, opts: CallOptions, callerName?: string) {
  const url = getUrl(opts.path, opts.query);
  const { error } = (await response.json()) as ApiErrorResponseBody;
  const statusTextStr: string = response.statusText ? ` (${response.statusText})` : "";
  return `${callerName ? `${callerName} r` : "R"}eceived HTTP ${response.status}${statusTextStr} from ${opts.method} ${url}: ${error.message}`;
}

function logHttpResponse<T extends MayHaveCharacter & MayHaveCooldown>(callerName: string, body: MayHaveData<T>) {
  const { hideCharacterInResponseLog: hideChar, hideCooldownInResponseLog: hideCool } = config;
  const clone = structuredClone(body);
  // biome-ignore lint/performance/noDelete: Much easier than any alternative; performance is not a concern
  if (clone.data?.character && hideChar) delete clone.data.character;
  // biome-ignore lint/performance/noDelete: Much easier than any alternative; performance is not a concern
  if (clone.data?.cooldown && hideCool) delete clone.data.cooldown;
  log(callerName, `Response: ${pp(clone)}`);
}
