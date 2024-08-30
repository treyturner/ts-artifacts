import type { HasClient } from "..";
import { handlePaging, infoCall, pageCall, type CallOptions } from "../http";
import type { DataPage, MapReq, Mapp, MapsReq } from "../types";
import { getCallerName } from "../util";

export const mapsInfo = { get, getAll };

function get(this: HasClient, query: MapReq) {
  const method = "GET";
  const path = `/maps/${query.x}/${query.y}`;
  const opts: CallOptions = { config: this.client.config, method, path };
  return infoCall<Mapp>(getCallerName(), opts);
}

function getAll(this: HasClient, query?: Omit<NonNullable<MapsReq>, "page" | "size">) {
  const getMapsPage = (query: MapsReq) => {
    const method = "GET";
    const path = "/maps";
    const opts: CallOptions = { config: this.client.config, method, path, query };
    return pageCall<DataPage<Mapp>>(getCallerName(), opts);
  };

  return handlePaging<Mapp, MapsReq>(this.client.config, getCallerName(), getMapsPage, query);
}
