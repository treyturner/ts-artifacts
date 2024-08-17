import type { CharacterMovementData, MoveReq } from "../types";
import { call, getCallerName } from "../util";

export function move(x: number, y: number) {
  const method = "POST";
  const path = "/my/{name}/action/move";
  const body: MoveReq = { x, y };
  return call<CharacterMovementData>(getCallerName(), { method, path, body });
}

export default { move };
