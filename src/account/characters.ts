import type { HasClient } from "..";
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

export const characters = { create, destroy, getAchievements, getAll };

function create(this: HasClient, body: AddCharacterReq) {
  const method = "POST";
  const path = "/characters/create";
  const opts: CallOptions = { method, path, body, config: this.client.config };
  return infoCall<Character>(getCallerName(), opts);
}

function destroy(this: HasClient, body: DeleteCharacterReq) {
  const method = "POST";
  const path = "/characters/delete";
  const opts: CallOptions = { method, path, body, config: this.client.config };
  return infoCall<Character>(getCallerName(), opts);
}

function getAll(this: HasClient) {
  const getCharactersPage = (query: DataPageReq = {}) => {
    const method = "GET";
    const path = "/my/characters";
    const opts: CallOptions = { method, path, query, config: this.client.config };
    return pageCall<DataPage<Character>>(getCallerName(), opts);
  };

  return handlePaging<Character, DataPageReq>(this.client.config, getCallerName(), getCharactersPage);
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
