import { actionCall, handlePaging, infoCall, pageCall } from "../http";
import type { DataPage, GEItem, GEItemReq, GEItemsReq, GETransactionItem, GETransactionList } from "../types";
import { getCallerName } from "../util";

export const exchange = { buy, getItem, getItems, sell };

function buy(body: GETransactionItem) {
  const method = "POST";
  const path = "/my/{name}/action/ge/buy";
  return actionCall<GETransactionList>(getCallerName(), { method, path, body });
}

function sell(body: GETransactionItem) {
  const method = "POST";
  const path = "/my/{name}/action/ge/sell";
  return actionCall<GETransactionList>(getCallerName(), { method, path, body });
}

function getItem(query: GEItemReq) {
  const method = "GET";
  const path = `/ge/${query.code}`;
  return infoCall<GEItem>(getCallerName(), { method, path });
}

function getItems(query?: Omit<NonNullable<GEItemsReq>, "page" | "size">) {
  const getItemsPage = (query: GEItemsReq) => {
    const method = "GET";
    const path = "/ge";
    return pageCall<DataPage<GEItem>>(getCallerName(), { method, path, query });
  };

  return handlePaging<GEItem, GEItemsReq>(getCallerName(), getItemsPage, query);
}
