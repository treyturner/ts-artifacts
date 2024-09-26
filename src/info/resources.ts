import { handlePaging, infoCall, pageCall } from "../http";
import type { CallOptions, DataPage, DataPageQuery, HasClient, Resource, ResourceReq, ResourcesReq } from "../types";
import { getCallerName } from "../util";

export const resourcesInfo = { get, getAll, getPage };

async function get(this: HasClient, query: ResourceReq) {
  const method = "GET";
  const path = `/resources/${query.code}`;
  const opts: CallOptions = { auth: false, method, path, client: this.client };
  const responseBody = await infoCall<{ data: Resource }>(getCallerName(), opts);
  return responseBody.data;
}

function getPage(this: HasClient, query: ResourcesReq = {}) {
  const method = "GET";
  const path = "/resources";
  const opts: CallOptions = { auth: false, method, path, query, client: this.client };
  return pageCall<DataPage<Resource>>(getCallerName(), opts);
}

function getAll(this: HasClient, query?: DataPageQuery<ResourcesReq>) {
  return handlePaging<Resource, ResourcesReq>(
    this.client.config,
    getCallerName(),
    (fullQuery: ResourcesReq) => getPage.call(this, fullQuery),
    query,
  );
}
