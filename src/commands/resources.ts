import { callForInfo, callForPage, handlePaging } from "../http";
import type { DataPage, Resource, ResourceReq, ResourcesReq } from "../types";
import { getCallerName } from "../util";

/** Get a single resource by code */
export async function getResource(query: ResourceReq) {
  const method = "GET";
  const path = `/resource/${query.code}`;
  return callForInfo<Resource>(getCallerName(), { method, path });
}

/**
 * Get a data page of a list of resources, potentially filtered by a query.
 * Intended to be wrapped by `handlePaging()`
 **/
async function getResourcePage(query: ResourcesReq = {}) {
  const method = "GET";
  const path = "/maps/";
  return callForPage<DataPage<Resource>>(getCallerName(), { method, path, query });
}

/**
 * Return a complete set of resources matching the query,
 * collected across multiple pages of results as needed
 */
export async function getResources(query?: Omit<NonNullable<ResourcesReq>, "page" | "size">) {
  return handlePaging<Resource, ResourcesReq>(getResourcePage, query);
}

export default { get: getResource, getAll: getResources };
