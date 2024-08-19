import { callForInfo, callForPage, handlePaging } from "../http";
import type { DataPage, MapReq, Mapp, MapsReq } from "../types";
import { getCallerName } from "../util";

/** Get a single map by x, y coordinates */
export async function getMap(coordinates: MapReq) {
  const { x, y } = coordinates;
  const method = "GET";
  const path = `/maps/${x}/${y}`;
  return callForInfo<Mapp>(getCallerName(), { method, path });
}

/**
 * Get a data page of a list of maps, potentially filtered by content type and/or code.
 * Intended to be wrapped by handlePaging()
 **/
async function getMapsPage(query: MapsReq = {}) {
  const method = "GET";
  const path = "/maps/";
  return callForPage<DataPage<Mapp>>(getCallerName(), { method, path, query });
}

/**
 * Return a complete set of maps matching the query
 * collected across multiple pages of results as needed
 */
export async function getMaps(query?: Omit<NonNullable<MapsReq>, "page" | "size">) {
  return handlePaging<Mapp, MapsReq>(getMapsPage, query);
}

export default { get: getMap, getAll: getMaps };
