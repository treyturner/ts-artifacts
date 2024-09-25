import { handlePaging, infoCall, pageCall } from "../http";
import type {
  AddCharacterReq,
  CallOptions,
  Character,
  DataPage,
  DataPageReq,
  DeleteCharacterReq,
  HasClient,
  Log,
} from "../types";
import { getCallerName } from "../util";

export const characters = { create, destroy, getAll, getLogs };

async function create(this: HasClient, body: AddCharacterReq) {
  const method = "POST";
  const path = "/characters/create";
  const opts: CallOptions = { auth: true, method, path, body, client: this.client };
  const responseBody = await infoCall<{ data: Character }>(getCallerName(), opts);
  return responseBody.data;
}

async function destroy(this: HasClient, body: DeleteCharacterReq) {
  const method = "POST";
  const path = "/characters/delete";
  const opts: CallOptions = { auth: true, method, path, body, client: this.client };
  const responseBody = await infoCall<{ data: Character }>(getCallerName(), opts);
  return responseBody.data;
}

function getAll(this: HasClient) {
  const getCharactersPage = (query: DataPageReq = {}) => {
    const method = "GET";
    const path = "/my/characters";
    const opts: CallOptions = { auth: true, method, path, query, client: this.client };
    return pageCall<DataPage<Character>>(getCallerName(), opts);
  };

  return handlePaging<Character, undefined>(this.client.config, getCallerName(), getCharactersPage);
}

function getLogs(this: HasClient) {
  const getLogsPage = (query: DataPageReq = {}) => {
    const method = "GET";
    const path = "/my/logs";
    const opts: CallOptions = { auth: true, method, path, query, client: this.client };
    return pageCall<DataPage<Log>>(getCallerName(), opts);
  };

  return handlePaging<Log, undefined>(this.client.config, getCallerName(), getLogsPage);
}
