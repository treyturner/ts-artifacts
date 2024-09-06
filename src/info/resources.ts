import type { HasClient } from "..";
import { handlePaging, infoCall, pageCall } from "../http";
import type { CallOptions, DataPage, DataPageQuery, Resource, ResourceReq, ResourcesReq } from "../index";
import { getCallerName } from "../util";

export const resourcesInfo = { get, getAll };

async function get(this: HasClient, query: ResourceReq) {
  const method = "GET";
  const path = `/resources/${query.code}`;
  const opts: CallOptions = { method, path, config: this.client.config };
  const responseBody = await infoCall<{ data: Resource }>(getCallerName(), opts);
  return responseBody.data;
}

function getAll(this: HasClient, query?: DataPageQuery<ResourcesReq>) {
  const getResourcePage = (query: ResourcesReq = {}) => {
    const method = "GET";
    const path = "/resources";
    const opts: CallOptions = { method, path, query, config: this.client.config };
    return pageCall<DataPage<Resource>>(getCallerName(), opts);
  };

  return handlePaging<Resource, ResourcesReq>(this.client.config, getCallerName(), getResourcePage, query);
}
