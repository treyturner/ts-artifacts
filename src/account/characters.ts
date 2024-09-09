import type { HasClient, Log } from "..";
import { handlePaging, infoCall, pageCall } from "../http";
import type {
  Achievement,
  AddCharacterReq,
  CallOptions,
  Character,
  CharacterAchievementsReq,
  DataPage,
  DataPageQuery,
  DataPageReq,
  DeleteCharacterReq,
} from "../index";
import { getCallerName } from "../util";

export const characters = { create, destroy, getAchievements, getAll, getAllLogs };

async function create(this: HasClient, body: AddCharacterReq) {
  const method = "POST";
  const path = "/characters/create";
  const opts: CallOptions = { method, path, body, config: this.client.config };
  const responseBody = await infoCall<{ data: Character }>(getCallerName(), opts);
  return responseBody.data;
}

async function destroy(this: HasClient, body: DeleteCharacterReq) {
  const method = "POST";
  const path = "/characters/delete";
  const opts: CallOptions = { method, path, body, config: this.client.config };
  const responseBody = await infoCall<{ data: Character }>(getCallerName(), opts);
  return responseBody.data;
}

function getAll(this: HasClient) {
  const getCharactersPage = (query: DataPageReq = {}) => {
    const method = "GET";
    const path = "/my/characters";
    const opts: CallOptions = { method, path, query, config: this.client.config };
    return pageCall<DataPage<Character>>(getCallerName(), opts);
  };

  return handlePaging<Character, undefined>(this.client.config, getCallerName(), getCharactersPage);
}

function getAllLogs(this: HasClient) {
  const getLogsPage = (query: DataPageReq = {}) => {
    const method = "GET";
    const path = "/my/logs";
    const opts: CallOptions = { method, path, query, config: this.client.config };
    return pageCall<DataPage<Log>>(getCallerName(), opts);
  };

  return handlePaging<Log, undefined>(this.client.config, getCallerName(), getLogsPage);
}

function getAchievements(this: HasClient, query?: DataPageQuery<CharacterAchievementsReq>) {
  const getAchievementsPage = (query: CharacterAchievementsReq = {}) => {
    const method = "GET";
    const path = "/characters/{name}/achievements";
    const opts: CallOptions = { method, path, query, config: this.client.config };
    return pageCall<DataPage<Achievement>>(getCallerName(), opts);
  };

  return handlePaging<Achievement, CharacterAchievementsReq>(
    this.client.config,
    getCallerName(),
    getAchievementsPage,
    query,
  );
}
