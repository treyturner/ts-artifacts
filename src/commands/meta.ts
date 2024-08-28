import { handlePaging, infoCall, pageCall } from "../http";
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

function getAchievement(query: AchievementReq) {
  const method = "GET";
  const path = `/achievements/${query.code}`;
  return infoCall<BaseAchievement>(getCallerName(), { method, path });
}

function getAchievements(query?: Omit<NonNullable<AchievementsReq>, "page" | "size">) {
  const getAchievementsPage = (query: AchievementsReq = {}) => {
    const method = "GET";
    const path = "/achievements";
    return pageCall<DataPage<BaseAchievement>>(getCallerName(), { method, path, query });
  };
  return handlePaging<BaseAchievement, AchievementsReq>(getCallerName(), getAchievementsPage, query);
}

function getLeaderboard() {
  const getLeaderboardPage = (query: DataPageReq = {}) => {
    const method = "GET";
    const path = "/leaderboard";
    return pageCall<DataPage<ActiveEvent>>(getCallerName(), { method, path, query });
  };

  return handlePaging<ActiveEvent, DataPageReq>(getCallerName(), getLeaderboardPage);
}

function getEvents() {
  const getEventsPage = (query: DataPageReq = {}) => {
    const method = "GET";
    const path = "/events";
    return pageCall<DataPage<ActiveEvent>>(getCallerName(), { method, path, query });
  };

  return handlePaging<ActiveEvent, DataPageReq>(getCallerName(), getEventsPage);
}

function getServerStatus() {
  const method = "GET";
  const path = "/";
  return infoCall<ServerStatus>(getCallerName(), { method, path });
}

export const meta = {
  achievements: {
    get: getAchievement,
    getAll: getAchievements,
  },
  getEvents,
  getLeaderboard,
  getServerStatus,
};
