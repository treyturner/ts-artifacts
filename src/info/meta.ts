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

export const metaInfo = { getEvents, getLeaderboard, getServerStatus };

function getEvents(this: HasClient) {
  const getEventsPage = (query: DataPageReq = {}) => {
    const method = "GET";
    const path = "/events";
    const opts: CallOptions = { auth: false, method, path, query, client: this.client };
    return pageCall<DataPage<ActiveEvent>>(getCallerName(), opts);
  };

  return handlePaging<ActiveEvent, undefined>(this.client.config, getCallerName(), getEventsPage);
}

function getLeaderboard(this: HasClient) {
  const getLeaderboardPage = (query: DataPageReq = {}) => {
    const method = "GET";
    const path = "/leaderboard";
    const opts: CallOptions = { auth: false, method, path, query, client: this.client };
    return pageCall<DataPage<CharacterLeaderboard>>(getCallerName(), opts);
  };

  return handlePaging<CharacterLeaderboard, undefined>(this.client.config, getCallerName(), getLeaderboardPage);
}

async function getServerStatus(this: HasClient) {
  const method = "GET";
  const path = "/";
  const opts: CallOptions = { auth: false, method, path, client: this.client };
  const responseBody = await infoCall<{ data: ServerStatus }>(getCallerName(), opts);
  return responseBody.data;
}
