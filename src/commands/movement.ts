import type { Character, Cooldown, Destination } from "../types";
import { type SupportedMethod, call, getCallerName } from "../util";

type MoveResponse = {
  data: {
    cooldown: Cooldown;
    destination: Destination;
    character: Character;
  };
};

export function move(x: number, y: number) {
  const path = "my/:character/action/move";
  const method: SupportedMethod = "POST";
  const body = { x, y };
  return call<MoveResponse>(getCallerName(), { method, path, body });
}

export default { move };
