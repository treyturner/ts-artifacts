import { handlePaging, infoCall, pageCall } from "../http";
import type { DataPage, Resource, ResourceReq, ResourcesReq } from "../types";
import { getCallerName } from "../util";

export const resources = { get, getAll };

/** Get a single resource by code */
function get(query: ResourceReq) {
  const method = "GET";
  const path = `/resources/${query.code}`;
  return infoCall<Resource>(getCallerName(), { method, path });
}

/**
 * Get a data page of a list of resources, potentially filtered by a query.
 * Intended to be wrapped by `handlePaging()`
 **/
function getResourcePage(query: ResourcesReq = {}) {
  const method = "GET";
  const path = "/resources";
  return pageCall<DataPage<Resource>>(getCallerName(), { method, path, query });
}

/**
 * Return a complete set of resources matching the query,
 * collected across multiple pages of results as needed
 */
export async function getAll(query?: Omit<NonNullable<ResourcesReq>, "page" | "size">) {
  return handlePaging<Resource, ResourcesReq>(getCallerName(), getResourcePage, query);
}
