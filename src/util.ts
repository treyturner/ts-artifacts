import "dotenv";
import { prettyPrint } from "@base2/pretty-print-object";
import type { Cooldown } from "./types";

const { env } = process;

if (!env.API_TOKEN || !env.CHARACTER) throw new Error("API_TOKEN and CHARACTER environment variables are required");

const config = {
  apiHost: env.API_HOST ?? "https://api.artifactsmmo.com",
  apiToken: env.API_TOKEN,
  name: env.CHARACTER,
};

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

function getUrl(templatePath: string) {
  const path = replacePathTokens(templatePath);
  const url = `${config.apiHost}/${path}`;
  return url;
}

type CallOptions = {
  path: string;
  method: SupportedMethod;
  headers?: HttpHeaders;
  // biome-ignore lint/suspicious/noExplicitAny: Handles all types
  body?: any;
};

export async function call<T>(callerName: string, opts: CallOptions) {
  const response = await request(callerName, opts);
  const data = await (<T>handleResponse(callerName, response));
  return data;
}

export async function request(callerName: string, opts: CallOptions) {
  const fullOpts: Omit<FetchRequestInit, "body"> & { body?: string } = {
    method: opts.method,
    headers: { ...defaultHeaders, ...opts.headers },
    body: opts?.body ? JSON.stringify(opts.body) : undefined,
  };

  try {
    const url = getUrl(opts.path);
    log(callerName, `request: ${fullOpts.method} ${replacePathTokens(opts.path)} ${pp(opts.body)}`);
    const response = await fetch(url, fullOpts);
    return response;
  } catch (error: unknown) {
    throw new Error(getErrorText(error, "calling API"));
  }
}

interface MayHaveCooldown {
  data?: {
    cooldown?: Cooldown;
  };
}

async function handleResponse<T extends MayHaveCooldown>(callerName: string, response: Response) {
  try {
    const body = (await response.json()) as T;
    log(callerName, `response: ${pp(body)}`);
    await handleCooldown(callerName, body);
    return body.data ? body.data : body;
  } catch (error: unknown) {
    throw new Error(getErrorText(error, "handling response"));
  }
}

async function handleCooldown<T extends MayHaveCooldown>(callerName: string, body: T) {
  const cooldown = body.data?.cooldown;
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

function getErrorText(error: unknown, context?: string) {
  return `Error${context ? ` ${context}` : ""}: ${error instanceof Error ? error.message : error}`;
}

/** pretty print, but return empty string for undefined */
// biome-ignore lint/suspicious/noExplicitAny: true any support
export function pp(obj: any) {
  return typeof obj === "undefined"
    ? ""
    : prettyPrint(obj, {
        singleQuotes: false,
        indent: "  ",
        inlineCharacterLimit: 50,
      });
}

type LogFunction = {
  // biome-ignore lint/suspicious/noExplicitAny: true any support
  (...data: any[]): void;
  // biome-ignore lint/suspicious/noExplicitAny: true any support
  (message?: any, ...optionalParams: any[]): void;
};

export function log(
  callerName: string,
  msg: string,
  opts: { logFn?: LogFunction; newLine?: boolean; prefix?: boolean } = {},
) {
  opts.logFn ??= console.log;
  opts.newLine ??= true;
  opts.prefix ??= true;

  const line = `${opts.prefix ? `[${getLogTimestamp()}] ${callerName}: ` : ""}${msg}`;
  opts.newLine ? opts.logFn(line) : process.stdout.write(line);
}

export function getCallerName() {
  return new Error().stack?.split("\n")[3].trim().split(" ")[1] ?? "unknownCaller";
}

export const getLogTimestamp = (date: Date = new Date()): string => {
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth())}-${pad(date.getDay())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};
