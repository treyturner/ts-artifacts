import { handlePaging, infoCall, pageCall } from "../http";
import type { CallOptions, DataPage, DataPageQuery, HasClient, MapReq, Mapp, MapsReq } from "../index";
import { getCallerName } from "../util";

export const mapsInfo = { get, getAll };

async function get(this: HasClient, query: MapReq) {
  const method = "GET";
  const path = `/maps/${query.x}/${query.y}`;
  const opts: CallOptions = { auth: false, method, path, client: this.client };
  const responseBody = await infoCall<{ data: Mapp }>(getCallerName(), opts);
  return responseBody.data;
}

function getAll(this: HasClient, query?: DataPageQuery<MapsReq>) {
  const getMapsPage = (query: MapsReq) => {
    const method = "GET";
    const path = "/maps";
    const opts: CallOptions = { auth: false, method, path, query, client: this.client };
    return pageCall<DataPage<Mapp>>(getCallerName(), opts);
  };

  return handlePaging<Mapp, MapsReq>(this.client.config, getCallerName(), getMapsPage, query);
}
