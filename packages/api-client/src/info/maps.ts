import { handlePaging, infoCall, pageCall } from "../http";
import type { CallOptions, DataPage, DataPageQuery, HasClient, MapReq, Mapp, MapsReq } from "../types";
import { getCallerName } from "../util";

export const mapsInfo = { get, getAll, getPage };

async function get(this: HasClient, query: MapReq) {
  const method = "GET";
  const path = `/maps/${query.x}/${query.y}`;
  const opts: CallOptions = { auth: false, method, path, client: this.client };
  const responseBody = await infoCall<{ data: Mapp }>(getCallerName(), opts);
  return responseBody.data;
}

function getPage(this: HasClient, query: MapsReq) {
  const method = "GET";
  const path = "/maps";
  const opts: CallOptions = { auth: false, method, path, query, client: this.client };
  return pageCall<DataPage<Mapp>>(getCallerName(), opts);
}

function getAll(this: HasClient, query?: DataPageQuery<MapsReq>) {
  return handlePaging<Mapp, MapsReq>(
    this.client.config,
    getCallerName(),
    (fullQuery: MapsReq) => getPage.call(this, fullQuery),
    query,
  );
}
