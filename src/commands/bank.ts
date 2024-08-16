import type { Schemas } from "../types";
import { type SupportedMethod, call, getCallerName } from "../util";

export function depositGold(quantity: number) {
  const path = "my/{name}/action/bank/deposit/gold";
  const method = "POST";
  const body = { quantity };
  return call(getCallerName(), { method, path, body });
}

export function withdrawGold(quantity: number) {
  const path = "my/{name}/action/bank/withdraw/gold";
  const method = "POST";
  const body = { quantity };
  return call(getCallerName(), { method, path, body });
}

export function depositItem(code: string, quantity: number) {
  const path = "my/{name}/action/bank/deposit";
  const method = "POST";
  const body = { code, quantity };
  return call(getCallerName(), { method, path, body });
}

export function withdrawItem(code: string, quantity: number) {
  const path = "my/{name}/action/bank/withdraw";
  const method = "POST";
  const body = { code, quantity };
  return call(getCallerName(), { method, path, body });
}

export default { depositGold, depositItem, withdrawGold, withdrawItem };
