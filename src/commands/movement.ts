import { call } from "../http";
import type { CharacterMovementData, MoveReq } from "../types";
import { getCallerName } from "../util";

export function move(body: MoveReq) {
  const method = "POST";
  const path = "/my/{name}/action/move";
  return call<CharacterMovementData>(getCallerName(), { method, path, body });
}

export default { move };
