import "dotenv";

if (!process.env.API_TOKEN || !process.env.CHARACTER)
  throw new Error("API_TOKEN and CHARACTER environment variables are required");

const config = {
  apiHost: process.env.API_HOST ?? "https://api.artifactsmmo.com",
  token: process.env.API_TOKEN,
  character: process.env.CHARACTER,
};

export type SupportedMethod = "POST" | "GET";
type HttpHeaders = { [key: string]: string };

const defaultHeaders: HttpHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearer ${config.token}`,
};

function getUrl(path: string) {
  console.log("getUrl path:", path);
  let url = path;
  if (/\/:character\//.test(url)) {
    url = url.replaceAll(/\/:character\//g, `/${config.character}/`);
  }
  url = `${config.apiHost}/${url}`;
  console.log("getUrl url:", url);
  return url;
}

type CallOptions = {
  path: string;
  method: SupportedMethod;
  headers?: HttpHeaders;
  // biome-ignore lint/suspicious/noExplicitAny: Handles all types
  body?: any;
};

export async function call<T>(opts: CallOptions) {
  const response = await request(opts);
  const data = await (<T>handleResponse(response));
  return data;
}

export async function request(opts: CallOptions) {
  const fullOpts: FetchRequestInit = {
    method: opts.method,
    headers: { ...defaultHeaders, ...opts.headers },
    body: opts?.body ? JSON.stringify(opts.body) : undefined,
  };

  try {
    const response = await fetch(getUrl(opts.path), fullOpts);
    return response;
  } catch (error: unknown) {
    throw new Error(getErrorText(error, "calling API"));
  }
}

async function handleResponse<T>(response: Response) {
  try {
    const data = (await response.json()) as T;
    console.log(data);
    return data;
  } catch (error: unknown) {
    throw new Error(getErrorText(error, "handling response"));
  }
}

function getErrorText(error: unknown, context?: string) {
  return `Error${context ? ` ${context}` : ""}: ${error instanceof Error ? error.message : error}`;
}
