import type { HasClient } from "..";
import { type CallOptions, handlePaging, infoCall, pageCall } from "../http";
import type {
  AchievementReq,
  AchievementsReq,
  ActiveEvent,
  BaseAchievement,
  DataPage,
  DataPageReq,
  ServerStatus,
} from "../types";
import { getCallerName } from "../util";

export const meta = { getAchievement, getAchievements, getEvents, getLeaderboard, getServerStatus };

async function getAchievement(this: HasClient, query: AchievementReq) {
  const method = "GET";
  const path = `/achievements/${query.code}`;
  const opts: CallOptions = { method, path, config: this.client.config };
  const responseBody = await infoCall<{ data: BaseAchievement }>(getCallerName(), opts);
  return responseBody.data;
}

function getAchievements(this: HasClient, query?: Omit<NonNullable<AchievementsReq>, "page" | "size">) {
  const getAchievementsPage = (query: AchievementsReq = {}) => {
    const method = "GET";
    const path = "/achievements";
    const opts: CallOptions = { method, path, query, config: this.client.config };
    return pageCall<DataPage<BaseAchievement>>(getCallerName(), opts);
  };

  return handlePaging<BaseAchievement, AchievementsReq>(
    this.client.config,
    getCallerName(),
    getAchievementsPage,
    query,
  );
}

function getEvents(this: HasClient) {
  const getEventsPage = (query: DataPageReq = {}) => {
    const method = "GET";
    const path = "/events";
    const opts: CallOptions = { method, path, query, config: this.client.config };
    return pageCall<DataPage<ActiveEvent>>(getCallerName(), opts);
  };

  return handlePaging<ActiveEvent, DataPageReq>(this.client.config, getCallerName(), getEventsPage);
}

function getLeaderboard(this: HasClient) {
  const getLeaderboardPage = (query: DataPageReq = {}) => {
    const method = "GET";
    const path = "/leaderboard";
    const opts: CallOptions = { method, path, query, config: this.client.config };
    return pageCall<DataPage<ActiveEvent>>(getCallerName(), opts);
  };

  return handlePaging<ActiveEvent, DataPageReq>(this.client.config, getCallerName(), getLeaderboardPage);
}

async function getServerStatus(this: HasClient) {
  const method = "GET";
  const path = "/";
  const opts: CallOptions = { method, path, config: this.client.config };
  const responseBody = await infoCall<{ data: ServerStatus }>(getCallerName(), opts);
  return responseBody.data;
}
