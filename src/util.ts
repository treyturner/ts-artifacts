import "dotenv";
import { inspect } from "bun";
import type { ImageType } from "./types";

const { env } = process;

if (!env.API_TOKEN || !env.CHARACTER) throw new Error("API_TOKEN and CHARACTER environment variables are required");

const affirmative = ["1", "TRUE", "ON", "YES"];

export const config = {
  apiHost: env.API_HOST ?? "https://api.artifactsmmo.com",
  apiToken: env.API_TOKEN,
  name: env.CHARACTER,
  logHttpRequests: affirmative.includes(env.LOG_HTTP_REQUESTS?.toUpperCase() ?? ""),
  logHttpResponses: affirmative.includes(env.LOG_HTTP_RESPONSES?.toUpperCase() ?? ""),
};

export function getImageUrl(type: ImageType, id: string) {
  return `${config.apiHost}/images/${type}s/${id}.png`;
}

export function getErrorText(error: unknown, context?: string) {
  return `Error${context ? ` ${context}` : ""}: ${error instanceof Error ? error.message : error}`;
}

/** pretty print, but return empty string for undefined */
// biome-ignore lint/suspicious/noExplicitAny: util.inspect accepts any
export function pp(obj: any) {
  return typeof obj === "undefined" ? "" : inspect(obj, { colors: true });
}

type LogFunction = {
  // biome-ignore lint/suspicious/noExplicitAny: console.log accepts any
  (...data: any[]): void;
  // biome-ignore lint/suspicious/noExplicitAny: console.log accepts any
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
  if (opts.newLine) {
    opts.logFn(line);
  } else {
    process.stdout.write(line);
  }
}

export function getCallerName() {
  return new Error().stack?.split("\n")[3].trim().split(" ")[1] ?? "unknownCaller";
}

export function getLogTimestamp(date: Date = new Date()): string {
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth())}-${pad(date.getDay())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

export function pluralize(input: Array<unknown> | number, suffix = "s") {
  const num = Array.isArray(input) ? input.length : input;
  if (num === 1 || num === -1) return "";
  return suffix;
}
