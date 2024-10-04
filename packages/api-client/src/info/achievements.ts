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
  DataPageReq,
  HasClient,
} from "../types";
import { getCallerName } from "../util";

export const achievementsInfo = { get, getAll, getCharacterAchievements, getCharacterAchievementsPage, getPage };

async function get(this: HasClient, query: AchievementReq) {
  const method = "GET";
  const path = `/achievements/${query.code}`;
  const opts: CallOptions = { auth: false, method, path, client: this.client };
  const responseBody = await infoCall<{ data: BaseAchievement }>(getCallerName(), opts);
  return responseBody.data;
}

function getPage(this: HasClient, query: AchievementsReq = {}) {
  const method = "GET";
  const path = "/achievements";
  const opts: CallOptions = { auth: false, method, path, query, client: this.client };
  return pageCall<DataPage<BaseAchievement>>(getCallerName(), opts);
}

function getAll(this: HasClient, query?: DataPageQuery<AchievementsReq>) {
  return handlePaging<BaseAchievement, AchievementsReq>(
    this.client.config,
    getCallerName(),
    (fullQuery: AchievementsReq) => getPage.call(this, fullQuery),
    query,
  );
}

function getCharacterAchievementsPage(this: HasClient, characterName: string, query: CharacterAchievementsReq = {}) {
  const method = "GET";
  const path = `/characters/${characterName}/achievements`;
  const opts: CallOptions = { auth: false, method, path, query, client: this.client };
  return pageCall<DataPage<Achievement>>(getCallerName(), opts);
}

function getCharacterAchievements(
  this: HasClient,
  characterName: string,
  query?: DataPageQuery<CharacterAchievementsReq>,
) {
  return handlePaging<Achievement, CharacterAchievementsReq>(
    this.client.config,
    getCallerName(),
    (fullQuery: DataPageReq) => getCharacterAchievementsPage.call(this, characterName, fullQuery),
    query,
  );
}
