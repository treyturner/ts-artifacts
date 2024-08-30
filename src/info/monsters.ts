import type { HasClient } from "..";
import { type CallOptions, handlePaging, infoCall, pageCall } from "../http";
import type { DataPage, Monster, MonsterReq, MonstersReq } from "../types";
import { getCallerName } from "../util";

export const monstersInfo = { get, getAll };

async function get(this: HasClient, query: MonsterReq) {
  const method = "GET";
  const path = `/monster/${query.code}`;
  const opts: CallOptions = { method, path, config: this.client.config };
  const responseBody = await infoCall<{ data: Monster }>(getCallerName(), opts);
  return responseBody.data;
}

function getAll(this: HasClient, query?: Omit<NonNullable<MonstersReq>, "page" | "size">) {
  const getMonstersPage = (query: MonstersReq = {}) => {
    const method = "GET";
    const path = "/monster";
    const opts: CallOptions = { method, path, query, config: this.client.config };
    return pageCall<DataPage<Monster>>(getCallerName(), opts);
  };

  return handlePaging<Monster, MonstersReq>(this.client.config, getCallerName(), getMonstersPage, query);
}
