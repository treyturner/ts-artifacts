import type { HasClient } from "..";
import { handlePaging, infoCall, pageCall, type CallOptions } from "../http";
import type { DataPage, GEItem, GEItemReq, GEItemsReq } from "../types";
import { getCallerName } from "../util";

export const exchangeInfo = { getItem, getItems };

async function getItem(this: HasClient, query: GEItemReq) {
  const method = "GET";
  const path = `/ge/${query.code}`;
  const opts: CallOptions = { method, path, config: this.client.config };
  const responseBody = await infoCall<{ data: GEItem }>(getCallerName(), opts);
  return responseBody.data;
}

function getItems(this: HasClient, query?: Omit<NonNullable<GEItemsReq>, "page" | "size">) {
  const getItemsPage = (query: GEItemsReq) => {
    const method = "GET";
    const path = "/ge";
    const opts: CallOptions = { method, path, query, config: this.client.config };
    return pageCall<DataPage<GEItem>>(getCallerName(), opts);
  };

  return handlePaging<GEItem, GEItemsReq>(this.client.config, getCallerName(), getItemsPage, query);
}
