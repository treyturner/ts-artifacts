import type { HasClient } from "..";
import { handlePaging, infoCall, pageCall } from "../http";
import type { CallOptions, DataPage, DataPageQuery, Item, ItemReq, ItemsReq, SingleItem } from "../index";
import { getCallerName } from "../util";

export const itemsInfo = { get, getAll };

async function get(this: HasClient, query: ItemReq) {
  const method = "GET";
  const path = `/items/${query.code}`;
  const opts: CallOptions = { method, path, config: this.client.config };
  const responseBody = await infoCall<{ data: SingleItem }>(getCallerName(), opts);
  return responseBody.data;
}

function getAll(this: HasClient, query?: DataPageQuery<ItemsReq>) {
  const getItemsPage = (query: ItemsReq = {}) => {
    const method = "GET";
    const path = "/items";
    const opts: CallOptions = { method, path, query, config: this.client.config };
    return pageCall<DataPage<Item>>(getCallerName(), opts);
  };

  return handlePaging<Item, ItemsReq>(this.client.config, getCallerName(), getItemsPage, query);
}
