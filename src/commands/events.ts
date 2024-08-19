import { callForPage, handlePaging } from "../http";
import type { ActiveEvent, DataPage, DataPageReq } from "../types";
import { getCallerName } from "../util";

/** Get a data page of a list of events. Intended to be wrapped by `handlePaging()` */
async function getEventsPage(query: DataPageReq = {}) {
  const method = "GET";
  const path = "/events/";
  return callForPage<DataPage<ActiveEvent>>(getCallerName(), { method, path, query });
}

/** Return a complete set of events, collected across multiple pages of results as needed */
export async function getEvents() {
  return handlePaging<ActiveEvent, DataPageReq>(getEventsPage);
}
