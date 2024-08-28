import { handlePaging, infoCall, pageCall } from "../http";
import type {
  Achievement,
  AddCharacterReq,
  Character,
  CharacterAchievementsReq,
  DataPage,
  DataPageReq,
  DeleteCharacterReq,
} from "../types";
import { getCallerName } from "../util";

export const characters = {
  create,
  destroy,
  getAchievements,
  getAll,
};

function create(body: AddCharacterReq) {
  const method = "POST";
  const path = "/characters/create";
  return infoCall<Character>(getCallerName(), { method, path, body });
}

function destroy(body: DeleteCharacterReq) {
  const method = "POST";
  const path = "/characters/delete";
  return infoCall<Character>(getCallerName(), { method, path, body });
}

function getAll() {
  const getCharactersPage = (query: DataPageReq = {}) => {
    const method = "GET";
    const path = "/my/characters";
    return pageCall<DataPage<Character>>(getCallerName(), { method, path, query });
  };

  return handlePaging<Character, DataPageReq>(getCallerName(), getCharactersPage);
}

function getAchievements(query?: Omit<NonNullable<CharacterAchievementsReq>, "page" | "size">) {
  const getAchievementsPage = (query: CharacterAchievementsReq = {}) => {
    const method = "GET";
    const path = "/achievements";
    return pageCall<DataPage<Achievement>>(getCallerName(), { method, path, query });
  };

  return handlePaging<Achievement, CharacterAchievementsReq>(getCallerName(), getAchievementsPage, query);
}
