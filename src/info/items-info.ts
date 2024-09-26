import { handlePaging, infoCall, pageCall } from "../http";
import type { CallOptions, DataPage, DataPageQuery, HasClient, Item, ItemReq, ItemsReq, SingleItem } from "../types";
import { getCallerName } from "../util";

export const itemsInfo = { get, getAll, getPage };

async function get(this: HasClient, query: ItemReq) {
  const method = "GET";
  const path = `/items/${query.code}`;
  const opts: CallOptions = { auth: false, method, path, client: this.client };
  const responseBody = await infoCall<{ data: SingleItem }>(getCallerName(), opts);
  return responseBody.data;
}

function getPage(this: HasClient, query: ItemsReq = {}) {
  const method = "GET";
  const path = "/items";
  const opts: CallOptions = { auth: false, method, path, query, client: this.client };
  return pageCall<DataPage<Item>>(getCallerName(), opts);
}

function getAll(this: HasClient, query?: DataPageQuery<ItemsReq>) {
  return handlePaging<Item, ItemsReq>(
    this.client.config,
    getCallerName(),
    (fullQuery: ItemsReq) => getPage.call(this, fullQuery),
    query,
  );
}
