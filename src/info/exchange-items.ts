import { handlePaging, infoCall, pageCall } from "../http";
import type { CallOptions, DataPage, DataPageQuery, GEItem, GEItemReq, GEItemsReq, HasClient } from "../types";
import { getCallerName } from "../util";

export const exchangeItemsInfo = { get, getAll, getPage };

async function get(this: HasClient, query: GEItemReq) {
  const method = "GET";
  const path = `/ge/${query.code}`;
  const opts: CallOptions = { auth: false, method, path, client: this.client };
  const responseBody = await infoCall<{ data: GEItem }>(getCallerName(), opts);
  return responseBody.data;
}

function getPage(this: HasClient, query: GEItemsReq) {
  const method = "GET";
  const path = "/ge";
  const opts: CallOptions = { auth: false, method, path, query, client: this.client };
  return pageCall<DataPage<GEItem>>(getCallerName(), opts);
}

function getAll(this: HasClient, query?: DataPageQuery<GEItemsReq>) {
  return handlePaging<GEItem, GEItemsReq>(
    this.client.config,
    getCallerName(),
    (fullQuery: GEItemsReq) => getPage.call(this, fullQuery),
    query,
  );
}
