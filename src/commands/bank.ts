import type { BankItem, GoldReq, GoldTransaction, SimpleItem } from "../types";
import { call, getCallerName } from "../util";

export function depositGold(quantity: number) {
  const method = "POST";
  const path = "/my/{name}/action/bank/deposit/gold";
  const body: GoldReq = { quantity };
  return call<GoldTransaction>(getCallerName(), { method, path, body });
}

export function withdrawGold(quantity: number) {
  const method = "POST";
  const path = "/my/{name}/action/bank/withdraw/gold";
  const body: GoldReq = { quantity };
  return call<GoldTransaction>(getCallerName(), { method, path, body });
}

export function depositItem(code: string, quantity: number) {
  const method = "POST";
  const path = "/my/{name}/action/bank/deposit";
  const body: SimpleItem = { code, quantity };
  return call<BankItem>(getCallerName(), { method, path, body });
}

export function withdrawItem(code: string, quantity: number) {
  const method = "POST";
  const path = "/my/{name}/action/bank/withdraw";
  const body: SimpleItem = { code, quantity };
  return call<BankItem>(getCallerName(), { method, path, body });
}

export default { depositGold, depositItem, withdrawGold, withdrawItem };
