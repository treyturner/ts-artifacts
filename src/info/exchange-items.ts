import type { CallOptions, DataPage, DataPageQuery, GEItem, GEItemReq, GEItemsReq, HasClient } from "..";
import { handlePaging, infoCall, pageCall } from "../http";
import { getCallerName } from "../util";

export const exchangeItemsInfo = { get, getAll };

async function get(this: HasClient, query: GEItemReq) {
  const method = "GET";
  const path = `/ge/${query.code}`;
  const opts: CallOptions = { auth: false, method, path, client: this.client };
  const responseBody = await infoCall<{ data: GEItem }>(getCallerName(), opts);
  return responseBody.data;
}

function getAll(this: HasClient, query?: DataPageQuery<GEItemsReq>) {
  const getItemsPage = (query: GEItemsReq) => {
    const method = "GET";
    const path = "/ge";
    const opts: CallOptions = { auth: false, method, path, query, client: this.client };
    return pageCall<DataPage<GEItem>>(getCallerName(), opts);
  };

  return handlePaging<GEItem, GEItemsReq>(this.client.config, getCallerName(), getItemsPage, query);
}
