import { handlePaging, infoCall, pageCall } from "../http";
import type {
  Achievement,
  AchievementReq,
  AchievementsReq,
  BaseAchievement,
  CallOptions,
  CharacterAchievementsReq,
  DataPage,
  DataPageQuery,
  HasClient,
} from "../types";
import { getCallerName } from "../util";

export const achievementsInfo = { get, getAll, getCharacterAchievements };

async function get(this: HasClient, query: AchievementReq) {
  const method = "GET";
  const path = `/achievements/${query.code}`;
  const opts: CallOptions = { auth: false, method, path, client: this.client };
  const responseBody = await infoCall<{ data: BaseAchievement }>(getCallerName(), opts);
  return responseBody.data;
}

function getAll(this: HasClient, query?: DataPageQuery<AchievementsReq>) {
  const getAchievementsPage = (query: AchievementsReq = {}) => {
    const method = "GET";
    const path = "/achievements";
    const opts: CallOptions = { auth: false, method, path, query, client: this.client };
    return pageCall<DataPage<BaseAchievement>>(getCallerName(), opts);
  };

  return handlePaging<BaseAchievement, AchievementsReq>(
    this.client.config,
    getCallerName(),
    getAchievementsPage,
    query,
  );
}

function getCharacterAchievements(
  this: HasClient,
  characterName: string,
  query?: DataPageQuery<CharacterAchievementsReq>,
) {
  const getCharacterAchievementsPage = (query: CharacterAchievementsReq = {}) => {
    const method = "GET";
    // Use the supplied name rather than the client's
    // configured character via replacePathTokens
    const path = `/characters/${characterName}/achievements`;
    const opts: CallOptions = { auth: false, method, path, query, client: this.client };
    return pageCall<DataPage<Achievement>>(getCallerName(), opts);
  };

  return handlePaging<Achievement, CharacterAchievementsReq>(
    this.client.config,
    getCallerName(),
    getCharacterAchievementsPage,
    query,
  );
}
