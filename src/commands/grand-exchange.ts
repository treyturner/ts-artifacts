import { type SupportedMethod, call, getCallerName } from "../util";

export function buy(code: string, quantity: number, price: number) {
  const path = "my/{name}/action/ge/buy";
  const method = "POST";
  const body = { code, quantity, price };
  return call(getCallerName(), { method, path, body });
}

export function sell(code: string, quantity: number, price: number) {
  const path = "my/{name}/action/ge/sell";
  const method = "POST";
  const body = { code, quantity, price };
  return call(getCallerName(), { method, path, body });
}

export default { buy, sell };
