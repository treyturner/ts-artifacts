import { handlePaging, infoCall, pageCall } from "../http";
import type {
  ActiveEvent,
  CallOptions,
  CharacterLeaderboard,
  DataPage,
  DataPageReq,
  HasClient,
  ServerStatus,
} from "../types";
import { getCallerName } from "../util";

export const metaInfo = { getEvents, getEventsPage, getLeaderboard, getLeaderboardPage, getServerStatus };

function getEventsPage(this: HasClient, query: DataPageReq = {}) {
  const method = "GET";
  const path = "/events";
  const opts: CallOptions = { auth: false, method, path, query, client: this.client };
  return pageCall<DataPage<ActiveEvent>>(getCallerName(), opts);
}

function getEvents(this: HasClient) {
  return handlePaging<ActiveEvent, never>(this.client.config, getCallerName(), (fullQuery: DataPageReq) =>
    getEventsPage.call(this, fullQuery),
  );
}

function getLeaderboardPage(this: HasClient, query: DataPageReq = {}) {
  const method = "GET";
  const path = "/leaderboard";
  const opts: CallOptions = { auth: false, method, path, query, client: this.client };
  return pageCall<DataPage<CharacterLeaderboard>>(getCallerName(), opts);
}

function getLeaderboard(this: HasClient) {
  return handlePaging<CharacterLeaderboard, never>(this.client.config, getCallerName(), (fullQuery: DataPageReq) =>
    getLeaderboardPage.call(this, fullQuery),
  );
}

async function getServerStatus(this: HasClient) {
  const method = "GET";
  const path = "/";
  const opts: CallOptions = { auth: false, method, path, client: this.client };
  const responseBody = await infoCall<{ data: ServerStatus }>(getCallerName(), opts);
  return responseBody.data;
}
