import type { Cooldown, DataPage, DataPageReq } from "./types";
import { config, getErrorText, log, pp } from "./util";

export type SupportedMethod = "POST" | "GET";
type HttpHeaders = { [key: string]: string };

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
  const stringified: { [key: string]: string } = Object.fromEntries(
    Object.entries(query ?? {}).map(([k, v]) => {
      if (typeof v === "string") return [k, v];
      return [k, String(v)];
    }),
  );
  const params = new URLSearchParams(stringified);
  let str = params.toString();
  if (str.length > 0) str = `?${str}`;
  return str;
}

interface MayHaveCooldown {
  cooldown?: Cooldown;
}

interface MayHaveDataWithCooldown<T extends MayHaveCooldown> {
  data?: T;
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
  method: SupportedMethod;
  path: string;
  // biome-ignore lint/suspicious/noExplicitAny: String() accepts any
  query?: { [key: string]: any };
  headers?: HttpHeaders;
  // biome-ignore lint/suspicious/noExplicitAny: JSON.stringify() accepts any
  body?: any;
};

/** Call the API, wait for cooldown, and return the data property extracted from the body */
export async function call<T extends MayHaveCooldown>(callerName: string, opts: CallOptions) {
  const response = await request(callerName, opts);
  const data = await handleResponse<T>(callerName, response);
  return data;
}

/** Makes a request, returning the Response */
export async function request(callerName: string, opts: CallOptions) {
  const fullOpts: Omit<FetchRequestInit, "body"> & { body?: string } = {
    method: opts.method,
    headers: { ...defaultHeaders, ...opts.headers },
    body: opts?.body ? JSON.stringify(opts.body) : undefined,
  };

  try {
    const path = replacePathTokens(opts.path) + getQueryString(opts.query);
    if (config.logHttpRequests) log(callerName, `Request: ${fullOpts.method} ${path} ${pp(opts.body)}`);
    const url = getUrl(opts.path, opts.query);
    const response = await fetch(url, fullOpts);
    return response;
  } catch (error: unknown) {
    throw new Error(getErrorText(error, "calling API"));
  }
}

/** API response handler. Waits for any cooldown and returns the body */
export async function handleResponse<T extends MayHaveCooldown>(callerName: string, response: Response) {
  if (!response.ok) await throwNotOkResponse(response);
  try {
    const body = (await response.json()) as MayHaveDataWithCooldown<T>;
    if (config.logHttpResponses) log(callerName, `Response: ${pp(body)}`);
    await handleCooldown<T>(callerName, body);
    if (!body.data) throw new Error("Didn't receive data property in response body?");
    return body.data;
  } catch (error: unknown) {
    throw new Error(getErrorText(error, "handling response"));
  }
}

/** Waits for a cooldown if specified in the response data */
async function handleCooldown<T extends MayHaveCooldown>(callerName: string, body: MayHaveDataWithCooldown<T>) {
  const cooldown = body?.data?.cooldown;
  if (cooldown) {
    const { total_seconds: totalSeconds, reason } = cooldown;
    log(callerName, `Cooldown ${totalSeconds}s from ${reason}...`, { newLine: false });
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
export async function callForPage<T extends DataPage>(callerName: string, opts: CallOptions) {
  const response = await request(callerName, opts);
  const body: T = await handlePageResponse<T>(callerName, response);
  return body;
}

/** API response handler for DataPages */
async function handlePageResponse<T extends DataPage>(callerName: string, response: Response) {
  if (!response.ok) await throwNotOkResponse(response);
  try {
    const body = (await response.json()) as T;
    if (config.logHttpResponses) log(callerName, `Response: ${pp(body)}`);
    if (!body) throw new Error("Didn't receive a response body?");
    if (!body.data) throw new Error("Didn't receive data property in response body?");
    return body;
  } catch (error: unknown) {
    throw new Error(getErrorText(error, "handling response"));
  }
}

/** Page-handling wrapper for collecting all matching records across multiple data pages */
export async function handlePaging<T, R extends DataPageReq | undefined>(
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

  return items;
}

/** Call the API for info (not requiring a cooldown) and return the extracted data property */
export async function callForInfo<T>(callerName: string, opts: CallOptions) {
  const response = await request(callerName, opts);
  const body = await handleInfoResponse<T>(callerName, response);
  return body;
}

/** API response handler for info calls (not requiring a cooldown) */
async function handleInfoResponse<T>(callerName: string, response: Response) {
  if (!response.ok) await throwNotOkResponse(response);
  try {
    const body = (await response.json()) as MayHaveData<T>;
    if (config.logHttpResponses) log(callerName, `Response: ${pp(body)}`);
    if (!body) throw new Error("Didn't receive a response body?");
    if (!body.data) throw new Error("Didn't receive data property in response body?");
    return body;
  } catch (error: unknown) {
    throw new Error(getErrorText(error, "handling response"));
  }
}

async function throwNotOkResponse(response: Response) {
  const { error } = (await response.json()) as ApiErrorResponseBody;
  throw new Error(`Received HTTP ${response.status} ${response.statusText}: ${error.message}`);
}
