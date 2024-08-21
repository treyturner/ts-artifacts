import { call } from "../http";
import type { CharacterMovementData, MoveReq } from "../types";
import { getCallerName } from "../util";

export function move(arg1: number, arg2: number): Promise<CharacterMovementData>;
export function move(arg1?: MoveReq): Promise<CharacterMovementData>;
export function move(arg1?: number | MoveReq, arg2?: number) {
  const method = "POST";
  const path = "/my/{name}/action/move";
  const notThrowable = [490];

  let body: MoveReq;
  if (typeof arg1 === "number") {
    if (typeof arg2 === "undefined") throw new Error("move arg2 unexpectedly undefined");
    body = { x: arg1, y: arg2 };
  } else if (typeof arg1 !== "undefined") body = arg1;
  else throw new Error("move() was passed an undefined MoveReq");

  return call<CharacterMovementData>(getCallerName(), { method, path, body, notThrowable });
}

export default { move };
