import { call, callForInfo, callForPage, handlePaging } from "../http";
import type { DataPage, GEItem, GEItemReq, GEItemsReq, GETransactionItem, GETransactionList } from "../types";
import { getCallerName } from "../util";

export function buy(body: GETransactionItem) {
  const method = "POST";
  const path = "/my/{name}/action/ge/buy";
  return call<GETransactionList>(getCallerName(), { method, path, body });
}

export function sell(body: GETransactionItem) {
  const method = "POST";
  const path = "/my/{name}/action/ge/sell";
  return call<GETransactionList>(getCallerName(), { method, path, body });
}

/** Get a single item by code */
export async function getGEItem(query: GEItemReq) {
  const method = "GET";
  const path = `/ge/${query.code}`;
  return callForInfo<GEItem>(getCallerName(), { method, path });
}

/**
 * Get a data page of a list of items, potentially filtered by a query.
 * Intended to be wrapped by `handlePaging()`
 **/
async function getGEItemsPage(query: GEItemsReq) {
  const method = "GET";
  const path = "/ge/";
  return callForPage<DataPage<GEItem>>(getCallerName(), { method, path, query });
}

/**
 * Return a complete set of items matching the query,
 * collected across multiple pages of results as needed
 */
export async function getGEItems(query?: Omit<NonNullable<GEItemsReq>, "page" | "size">) {
  return handlePaging<GEItem, GEItemsReq>(getGEItemsPage, query);
}

export default { buy, getItem: getGEItem, getItems: getGEItems, sell };
