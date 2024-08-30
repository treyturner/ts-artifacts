import type { HasClient } from "..";
import { type CallOptions, handlePaging, infoCall, pageCall } from "../http";
import type { DataPage, Item, ItemReq, ItemsReq, SingleItem } from "../types";
import { getCallerName } from "../util";

export const itemsInfo = { get, getAll };

async function get(this: HasClient, query: ItemReq) {
  const method = "GET";
  const path = `/items/${query.code}`;
  const opts: CallOptions = { method, path, config: this.client.config };
  const responseBody = await infoCall<{ data: SingleItem }>(getCallerName(), opts);
  return responseBody.data;
}

function getAll(this: HasClient, query?: Omit<NonNullable<ItemsReq>, "page" | "size">) {
  const getItemsPage = (query: ItemsReq = {}) => {
    const method = "GET";
    const path = "/items";
    const opts: CallOptions = { method, path, query, config: this.client.config };
    return pageCall<DataPage<Item>>(getCallerName(), opts);
  };

  return handlePaging<Item, ItemsReq>(this.client.config, getCallerName(), getItemsPage, query);
}
