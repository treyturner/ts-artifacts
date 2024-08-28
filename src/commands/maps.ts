import { handlePaging, infoCall, pageCall } from "../http";
import type { DataPage, MapReq, Mapp, MapsReq } from "../types";
import { getCallerName } from "../util";

export const maps = { get, getAll };

export async function get(query: MapReq) {
  const method = "GET";
  const path = `/maps/${query.x}/${query.y}`;
  return infoCall<Mapp>(getCallerName(), { method, path });
}

export async function getAll(query?: Omit<NonNullable<MapsReq>, "page" | "size">) {
  const getMapsPage = (query: MapsReq) => {
    const method = "GET";
    const path = "/maps";
    return pageCall<DataPage<Mapp>>(getCallerName(), { method, path, query });
  };

  return handlePaging<Mapp, MapsReq>(getCallerName(), getMapsPage, query);
}
