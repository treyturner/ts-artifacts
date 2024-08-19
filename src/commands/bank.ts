import { call } from "../http";
import type { BankItem, GoldReq, GoldTransaction, SimpleItem } from "../types";
import { getCallerName } from "../util";

export function depositGold(body: GoldReq) {
  const method = "POST";
  const path = "/my/{name}/action/bank/deposit/gold";
  return call<GoldTransaction>(getCallerName(), { method, path, body });
}

export function withdrawGold(body: GoldReq) {
  const method = "POST";
  const path = "/my/{name}/action/bank/withdraw/gold";
  return call<GoldTransaction>(getCallerName(), { method, path, body });
}

export function depositItem(body: SimpleItem) {
  const method = "POST";
  const path = "/my/{name}/action/bank/deposit";
  return call<BankItem>(getCallerName(), { method, path, body });
}

export function withdrawItem(body: SimpleItem) {
  const method = "POST";
  const path = "/my/{name}/action/bank/withdraw";
  return call<BankItem>(getCallerName(), { method, path, body });
}

export default { depositGold, depositItem, withdrawGold, withdrawItem };
