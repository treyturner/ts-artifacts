import { type SupportedMethod, call, getCallerName } from "../util";

export function depositGold(quantity: number) {
  const path = "my/:character/action/bank/deposit/gold";
  const method: SupportedMethod = "POST";
  const body = { quantity };
  return call(getCallerName(), { method, path, body });
}

export function withdrawGold(quantity: number) {
  const path = "my/:character/action/bank/withdraw/gold";
  const method: SupportedMethod = "POST";
  const body = { quantity };
  return call(getCallerName(), { method, path, body });
}

export function depositItem(code: string, quantity: number) {
  const path = "my/:character/action/bank/deposit";
  const method: SupportedMethod = "POST";
  const body = { code, quantity };
  return call(getCallerName(), { method, path, body });
}

export function withdrawItem(code: string, quantity: number) {
  const path = "my/:character/action/bank/withdraw";
  const method: SupportedMethod = "POST";
  const body = { code, quantity };
  return call(getCallerName(), { method, path, body });
}

export default { depositGold, depositItem, withdrawGold, withdrawItem };
