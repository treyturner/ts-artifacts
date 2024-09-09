import type { HasClient } from "..";
import { handlePaging, infoCall, pageCall } from "../http";
import type { ActiveEvent, CallOptions, DataPage, DataPageReq, ServerStatus } from "../index";
import { getCallerName } from "../util";

export const metaInfo = { getEvents, getLeaderboard, getServerStatus };

function getEvents(this: HasClient) {
  const getEventsPage = (query: DataPageReq = {}) => {
    const method = "GET";
    const path = "/events";
    const opts: CallOptions = { method, path, query, config: this.client.config };
    return pageCall<DataPage<ActiveEvent>>(getCallerName(), opts);
  };

  return handlePaging<ActiveEvent, undefined>(this.client.config, getCallerName(), getEventsPage);
}

function getLeaderboard(this: HasClient) {
  const getLeaderboardPage = (query: DataPageReq = {}) => {
    const method = "GET";
    const path = "/leaderboard";
    const opts: CallOptions = { method, path, query, config: this.client.config };
    return pageCall<DataPage<ActiveEvent>>(getCallerName(), opts);
  };

  return handlePaging<ActiveEvent, undefined>(this.client.config, getCallerName(), getLeaderboardPage);
}

async function getServerStatus(this: HasClient) {
  const method = "GET";
  const path = "/";
  const opts: CallOptions = { method, path, config: this.client.config };
  const responseBody = await infoCall<{ data: ServerStatus }>(getCallerName(), opts);
  return responseBody.data;
}
