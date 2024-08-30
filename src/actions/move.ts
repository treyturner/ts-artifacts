import type { HasClient } from "..";
import { type CallOptions, actionCall } from "../http";
import type { CharacterMovementData, MapContentType, MoveReq } from "../types";
import { getCallerName, log } from "../util";

export const moveActions = { to, toA };

function to(this: HasClient, x: number, y: number): Promise<CharacterMovementData | null> | undefined;
function to(this: HasClient, body?: MoveReq): Promise<CharacterMovementData | null> | undefined;
function to(this: HasClient, arg1?: number | MoveReq, arg2?: number) {
  const method = "POST";
  const path = "/my/{name}/action/move";
  const notThrowable = [490];

  if (typeof arg1 !== "undefined") {
    let body: MoveReq;

    if (typeof arg1 === "number") {
      if (typeof arg2 === "undefined") throw new Error("move() y coordinate undefined when x coordinate is a number");
      body = { x: arg1, y: arg2 };
    } else body = arg1;
    const opts: CallOptions = { method, path, body, notThrowable, config: this.client.config };
    return actionCall<CharacterMovementData>(getCallerName(), opts);
  }
  log(getCallerName(), "received undefined MoveReq", { logFn: console.warn });
  return undefined;
}

async function toA(this: HasClient, content_type?: MapContentType, content_code?: string) {
  const locs = await this.client.info.maps.getAll({ content_type, content_code });
  return this.client.move.to(locs[0]);
}
