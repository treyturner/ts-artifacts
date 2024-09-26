import { handlePaging, infoCall, pageCall } from "../http";
import type { CallOptions, Character, CharacterReq, DataPage, DataPageReq, HasClient } from "../types";
import { getCallerName } from "../util";

export const charactersInfo = { get, getAll, getPage };

async function get(this: HasClient, query: CharacterReq) {
  const method = "GET";
  const path = `/characters/${query.name}`;
  const opts: CallOptions = { auth: false, method, path, client: this.client };
  const responseBody = await infoCall<{ data: Character }>(getCallerName(), opts);
  return responseBody.data;
}

function getPage(this: HasClient, query: DataPageReq = {}) {
  const method = "GET";
  const path = "/characters";
  const opts: CallOptions = { auth: false, method, path, query, client: this.client };
  return pageCall<DataPage<Character>>(getCallerName(), opts);
}

function getAll(this: HasClient) {
  return handlePaging<Character, never>(this.client.config, getCallerName(), (fullQuery: DataPageReq) =>
    getPage.call(this, fullQuery),
  );
}
