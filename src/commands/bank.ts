import { call, callForPage, handlePaging } from "../http";
import type { BankItem, BankItemsReq, DataPage, GoldReq, GoldTransaction, SimpleItem } from "../types";
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

/**
 * Get a data page of a list of bank contents, potentially filtered by a query.
 * Intended to be wrapped by `handlePaging()`
 **/
async function getBankItemsPage(query: BankItemsReq) {
  const method = "GET";
  const path = "/my/bank/items";
  return callForPage<DataPage<SimpleItem>>(getCallerName(), { method, path, query });
}

/**
 * Return a complete set of bank contents matching the query,
 * collected across multiple pages of results as needed
 */
export async function getBankItems(query?: Omit<NonNullable<BankItemsReq>, "page" | "size">) {
  return handlePaging<SimpleItem, BankItemsReq>(getBankItemsPage, query);
}

export default { depositGold, depositItem, withdrawGold, withdrawItem, getItems: getBankItems };
