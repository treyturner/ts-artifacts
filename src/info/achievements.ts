import type { HasClient } from "..";
import { handlePaging, infoCall, pageCall } from "../http";
import type { AchievementReq, AchievementsReq, BaseAchievement, CallOptions, DataPage, DataPageQuery } from "../index";
import { getCallerName } from "../util";

export const achievementsInfo = { get, getAll };

async function get(this: HasClient, query: AchievementReq) {
  const method = "GET";
  const path = `/achievements/${query.code}`;
  const opts: CallOptions = { method, path, config: this.client.config };
  const responseBody = await infoCall<{ data: BaseAchievement }>(getCallerName(), opts);
  return responseBody.data;
}

function getAll(this: HasClient, query?: DataPageQuery<AchievementsReq>) {
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
