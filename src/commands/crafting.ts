import { type SupportedMethod, call, getCallerName } from "../util";

export function craft(code: string, quantity = 1) {
  const path = "my/:character/action/crafting";
  const method: SupportedMethod = "POST";
  const body = { code, quantity };
  return call(getCallerName(), { method, path, body });
}

export default { craft };
