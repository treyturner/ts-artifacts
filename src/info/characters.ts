import { handlePaging, infoCall, pageCall } from "../http";
import type { CallOptions, Character, CharacterReq, DataPage, DataPageReq, HasClient } from "../index";
import { getCallerName } from "../util";

export const charactersInfo = { get, getAll };

async function get(this: HasClient, query: CharacterReq) {
  const method = "GET";
  const path = `/characters/${query.name}`;
  const opts: CallOptions = { auth: false, method, path, client: this.client };
  const responseBody = await infoCall<{ data: Character }>(getCallerName(), opts);
  return responseBody.data;
}

function getAll(this: HasClient) {
  const getCharactersPage = (query: DataPageReq = {}) => {
    const method = "GET";
    const path = "/characters";
    const opts: CallOptions = { auth: false, method, path, query, client: this.client };
    return pageCall<DataPage<Character>>(getCallerName(), opts);
  };

  return handlePaging<Character, undefined>(this.client.config, getCallerName(), getCharactersPage);
}
