import type { CharacterMovementData } from "../types";
import { type SupportedMethod, call, getCallerName } from "../util";

export function move(x: number, y: number) {
  const path = "my/{name}/action/move";
  const method = "POST";
  const body = { x, y };
  return call<CharacterMovementData>(getCallerName(), { method, path, body });
}

export default { move };
