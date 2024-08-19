import { callForInfo, callForPage, handlePaging } from "../http";
import type { DataPage, Monster, MonsterReq, MonstersReq } from "../types";
import { getCallerName } from "../util";

/** Get a single monster by code */
export async function getMonster(query: MonsterReq) {
  const method = "GET";
  const path = `/monster/${query.code}`;
  return callForInfo<Monster>(getCallerName(), { method, path });
}

/**
 * Get a data page of a list of monsters, potentially filtered by a query.
 * Intended to be wrapped by `handlePaging()`
 **/
async function getMonstersPage(query: MonstersReq = {}) {
  const method = "GET";
  const path = "/monster/";
  return callForPage<DataPage<Monster>>(getCallerName(), { method, path, query });
}

/**
 * Return a complete set of monsters matching the query,
 * collected across multiple pages of results as needed
 */
export async function getMonsters(query?: Omit<NonNullable<MonstersReq>, "page" | "size">) {
  return handlePaging<Monster, MonstersReq>(getMonstersPage, query);
}

export default { get: getMonster, getAll: getMonsters };
