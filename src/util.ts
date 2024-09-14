import { type InspectOptions, inspect } from "node-inspect-extracted";
import type { ImageType } from ".";

export function getImageUrl(apiHost: string, type: ImageType, id: string) {
  return `${apiHost}/images/${type}s/${id}.png`;
}

export function getUnknownErrorText(error: unknown, context?: string) {
  return `Error${context ? ` ${context}` : ""}: ${error instanceof Error ? error.message : error}`;
}

/** pretty print, but return empty string for undefined and fit onto one line if reasonably short */
// biome-ignore lint/suspicious/noExplicitAny: util.inspect accepts any
export function pp(obj: any, opts: InspectOptions = {}) {
  const defaults: InspectOptions = {
    breakLength: 120,
    colors: true,
    depth: null,
  };
  if (typeof obj === "undefined") return "";
  return inspect(obj, { ...defaults, ...opts });
}

type LogFunction = {
  // biome-ignore lint/suspicious/noExplicitAny: console.log accepts any
  (...data: any[]): void;
  // biome-ignore lint/suspicious/noExplicitAny: console.log accepts any
  (message?: any, ...optionalParams: any[]): void;
};

/**
 * Return a copy of an object with all properties converted to strings.
 * Useful for building query strings from objects.
 **/
// biome-ignore lint/suspicious/noExplicitAny: String() accepts any
export function stringify(obj?: { [key: string]: any }): { [key: string]: string } {
  return Object.fromEntries(
    Object.entries(obj ?? {}).map(([k, v]) => {
      if (typeof v === "string") return [k, v];
      return [k, String(v)];
    }),
  );
}

/**
 * Return a copy of an object with undefined properties removed.
 * Used to sanitize headers when a request unsets a default value (ie. Authorization).
 **/
// biome-ignore lint/suspicious/noExplicitAny: Object.entries() accepts any
export function stripUndefined(obj?: { [key: string]: any }): { [key: string]: NonNullable<any> } {
  return Object.fromEntries(
    Object.entries(obj ?? {}).map(([k, v]) => {
      return typeof v !== "undefined" ? [k, v] : [];
    }),
  );
}

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

// biome-ignore lint/suspicious/noExplicitAny: String() accepts any
export function grammarJoin(array: Array<any> | undefined, opts: { conj?: string } = {}) {
  if (!array || array.length === 0) return "";
  const conj = opts.conj ?? "and";

  switch (array.length) {
    case 1:
      return String(array[0]);
    case 2:
      return array.map((e) => String(e)).join(` ${conj} `);
    default: {
      const stringified = array.map((e) => String(e));
      const result = stringified.slice(0, -1);
      result.push(`${conj} ${stringified.slice(-1)}`);
      return result.join(", ");
    }
  }
}
