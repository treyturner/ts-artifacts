import { type SupportedMethod, call, getCallerName } from "../util";

export function buy(code: string, quantity: number, price: number) {
  const path = "my/:character/action/ge/buy";
  const method: SupportedMethod = "POST";
  const body = { code, quantity, price };
  return call(getCallerName(), { method, path, body });
}

export function sell(code: string, quantity: number, price: number) {
  const path = "my/:character/action/ge/sell";
  const method: SupportedMethod = "POST";
  const body = { code, quantity, price };
  return call(getCallerName(), { method, path, body });
}

export default { buy, sell };
