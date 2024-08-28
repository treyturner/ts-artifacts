import { actionCall } from "../http";
import type { CharacterMovementData, MapContentType, MoveReq } from "../types";
import { getCallerName, log } from "../util";
import { maps } from "./maps";

function to(x: number, y: number): Promise<CharacterMovementData>;
function to(body?: MoveReq): Promise<CharacterMovementData>;
function to(arg1?: number | MoveReq, arg2?: number) {
  const method = "POST";
  const path = "/my/{name}/action/move";
  const notThrowable = [490];

  if (typeof arg1 !== "undefined") {
    let body: MoveReq;

    if (typeof arg1 === "number") {
      if (typeof arg2 === "undefined") throw new Error("move arg2 unexpectedly undefined");
      body = { x: arg1, y: arg2 };
    } else body = arg1;

    return actionCall<CharacterMovementData>(getCallerName(), { method, path, body, notThrowable });
  }
  log(getCallerName(), "received undefined MoveReq", { logFn: console.warn });
}

async function toA(content_type?: MapContentType, content_code?: string) {
  const locs = await maps.getAll({ content_type, content_code });
  return move.to(locs.at(0));
}

export const move = { to, toA };
