import { callForInfo, callForPage, handlePaging } from "../http";
import type { DataPage, Monster, MonsterReq, MonstersReq } from "../types";
import { getCallerName } from "../util";

/** Get a single map by x, y coordinates */
export async function getMonster(query: MonsterReq) {
  const method = "GET";
  const path = `/monster/${query.code}`;
  return callForInfo<Monster>(getCallerName(), { method, path });
}

/**
 * Get a data page of a list of maps, potentially filtered by content type and/or code.
 * Intended to be wrapped by handlePaging()
 **/
async function getMonstersPage(query: MonstersReq = {}) {
  const method = "GET";
  const path = "/maps/";
  return callForPage<DataPage<Monster>>(getCallerName(), { method, path, query });
}

/**
 * Return a complete set of maps matching the query
 * collected across multiple pages of results as needed
 */
export async function getMonsters(query?: Omit<NonNullable<MonstersReq>, "page" | "size">) {
  return handlePaging<Monster, MonstersReq>(getMonstersPage, query);
}

export default { get: getMonster, getAll: getMonsters };
