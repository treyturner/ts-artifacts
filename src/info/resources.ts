import type { CallOptions, DataPage, DataPageQuery, HasClient, Resource, ResourceReq, ResourcesReq } from "..";
import { handlePaging, infoCall, pageCall } from "../http";
import { getCallerName } from "../util";

export const resourcesInfo = { get, getAll };

async function get(this: HasClient, query: ResourceReq) {
  const method = "GET";
  const path = `/resources/${query.code}`;
  const opts: CallOptions = { auth: false, method, path, client: this.client };
  const responseBody = await infoCall<{ data: Resource }>(getCallerName(), opts);
  return responseBody.data;
}

function getAll(this: HasClient, query?: DataPageQuery<ResourcesReq>) {
  const getResourcePage = (query: ResourcesReq = {}) => {
    const method = "GET";
    const path = "/resources";
    const opts: CallOptions = { auth: false, method, path, query, client: this.client };
    return pageCall<DataPage<Resource>>(getCallerName(), opts);
  };

  return handlePaging<Resource, ResourcesReq>(this.client.config, getCallerName(), getResourcePage, query);
}
