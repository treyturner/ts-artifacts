import { handlePaging, infoCall, pageCall } from "../http";
import type { CallOptions, DataPage, DataPageQuery, HasClient, Monster, MonsterReq, MonstersReq } from "../types";
import { getCallerName } from "../util";

export const monstersInfo = { get, getAll, getPage };

async function get(this: HasClient, query: MonsterReq) {
  const method = "GET";
  const path = `/monster/${query.code}`;
  const opts: CallOptions = { auth: false, method, path, client: this.client };
  const responseBody = await infoCall<{ data: Monster }>(getCallerName(), opts);
  return responseBody.data;
}

function getPage(this: HasClient, query: MonstersReq = {}) {
  const method = "GET";
  const path = "/monster";
  const opts: CallOptions = { auth: false, method, path, query, client: this.client };
  return pageCall<DataPage<Monster>>(getCallerName(), opts);
}

function getAll(this: HasClient, query?: DataPageQuery<MonstersReq>) {
  return handlePaging<Monster, MonstersReq>(
    this.client.config,
    getCallerName(),
    (fullQuery: MonstersReq) => getPage.call(this, fullQuery),
    query,
  );
}
