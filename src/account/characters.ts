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

export const characters = { create, destroy, getAll, getLogs, getLogsPage, getPage };

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

function getPage(this: HasClient, query: DataPageReq = {}) {
  const method = "GET";
  const path = "/my/characters";
  const opts: CallOptions = { auth: true, method, path, query, client: this.client };
  return pageCall<DataPage<Character>>(getCallerName(), opts);
}

function getAll(this: HasClient) {
  return handlePaging<Character, never>(this.client.config, getCallerName(), (fullQuery: DataPageReq) =>
    getPage.call(this, fullQuery),
  );
}

function getLogsPage(this: HasClient, query: DataPageReq = {}) {
  const method = "GET";
  const path = "/my/logs";
  const opts: CallOptions = { auth: true, method, path, query, client: this.client };
  return pageCall<DataPage<Log>>(getCallerName(), opts);
}

function getLogs(this: HasClient) {
  return handlePaging<Log, never>(this.client.config, getCallerName(), (fullQuery: DataPageReq) =>
    getLogsPage.call(this, fullQuery),
  );
}
