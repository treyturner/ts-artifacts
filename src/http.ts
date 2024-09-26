import type { ArtifactsApi } from ".";
import type { CallOptions, Character, Config, Cooldown, DataPage, DataPageReq, HttpHeaders } from "./types";
import { getUnknownErrorText, log, pluralize, pp, stringify, stripUndefined } from "./util";

function getDefaultHeaders(config: Config): HttpHeaders {
  const headers: HttpHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  if (config.apiToken) headers.Authorization = `Bearer ${config.apiToken}`;
  return headers;
}

function replacePathTokens(client: ArtifactsApi, template: string) {
  if (!/{[a-zA-Z_$]\w*}/.test(template)) return template;

  let path = template;
  if (/{name}/.test(path)) {
    if (!client.config.character)
      throw new Error("Character must be specified before calling an action that requires it");
    path = path.replaceAll(/{name}/g, client.config.character);
  }

  return path;
}

// biome-ignore lint/suspicious/noExplicitAny: String() accepts any
function getUrl(client: ArtifactsApi, templatePath: string, query?: { [key: string]: any }) {
  const path = replacePathTokens(client, templatePath);
  const queryStr = getQueryString(query);
  const url = client.config.apiHost + path + queryStr;
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

/**
 * Call the API, wait for cooldown, and return the data property extracted from
 * the body. Returns null on not-ok statuses configured to be non-throwable.
 */
export async function actionCall<T extends MayHaveCooldown & MayHaveCharacter>(callerName: string, opts: CallOptions) {
  const response = await request(callerName, opts);
  const data = await handleResponse<T>(callerName, response, opts);
  return data;
}

/** Make a request and return a Response */
export async function request(callerName: string, opts: CallOptions) {
  if (opts.auth && !opts.client.config.apiToken) await opts.client.setToken();
  const fullOpts: Omit<FetchRequestInit, "body"> & { body?: string } = {
    method: opts.method,
    headers: stripUndefined({ ...getDefaultHeaders(opts.client.config), ...opts.headers }),
    body: opts?.body ? JSON.stringify(opts.body) : undefined,
    signal: opts?.timeout ? AbortSignal.timeout(opts.timeout) : undefined,
  };

  try {
    const path = replacePathTokens(opts.client, opts.path) + getQueryString(opts.query);
    if (opts.client.config.prefs.logHttpRequests)
      log(callerName, `Request: ${fullOpts.method} ${path} ${pp(opts.body)}`);
    const url = getUrl(opts.client, opts.path, opts.query);
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
    if (opts.client.config.prefs.logHttpResponses)
      logActionResponse(opts.client.config, callerName, structuredClone(body));
    await handleCooldown<T>(callerName, body);
    if (response.ok && !body.data) throw new Error("Didn't receive data property in ok response body?");
    return body.data ?? null;
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
  if (!response.ok) await throwNotOkResponse(response, opts, callerName);
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
export async function handlePaging<T, R extends DataPageReq | undefined | never>(
  config: Config,
  callerName: string,
  getPageFn: (pageQuery: DataPageReq) => Promise<DataPage<T>>,
  query?: Omit<NonNullable<R>, "page" | "size">,
) {
  const pageQuery: DataPageReq & { page: number } = { ...query, size: 100, page: 1 };
  const items: T[] = [];
  let body: DataPage<T>;

  do {
    body = await getPageFn(pageQuery);
    items.push(...body.data);
    pageQuery.page++;
  } while (body.page && body.pages && body.pages > body.page);

  if (config.prefs.logHttpResponses)
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
    if (opts.client.config.prefs.logHttpResponses) log(callerName, `Response: ${pp(body)}`);
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
  const url = getUrl(opts.client, opts.path, opts.query);
  const { error } = (await response.json()) as ApiErrorResponseBody;
  const statusTextStr: string = response.statusText ? ` (${response.statusText})` : "";
  return `${callerName ? `${callerName} r` : "R"}eceived HTTP ${response.status}${statusTextStr} from ${opts.method} ${url}: ${error.message}`;
}

/** Log an HTTP response, optionally stripping out cooldown and character objects for brevity */
function logActionResponse<T extends MayHaveCharacter & MayHaveCooldown>(
  config: Config,
  callerName: string,
  body: MayHaveData<T>,
) {
  const { hideCharacterInResponseLog: hideChar, hideCooldownInResponseLog: hideCool } = config.prefs;
  const clone = structuredClone(body);
  // biome-ignore lint/performance/noDelete: Much easier than any alternative; performance is not a concern
  if (clone.data?.character && hideChar) delete clone.data.character;
  // biome-ignore lint/performance/noDelete: Much easier than any alternative; performance is not a concern
  if (clone.data?.cooldown && hideCool) delete clone.data.cooldown;
  log(callerName, `Response: ${pp(clone)}`);
}
