import type { Slot } from "../types";
import { type SupportedMethod, call, getCallerName } from "../util";

export function equip(code: string, slot: Slot) {
  const path = "my/:character/action/equip";
  const method: SupportedMethod = "POST";
  const body = { code, slot };
  return call(getCallerName(), { method, path, body });
}

export function unequip(slot: Slot) {
  const path = "my/:character/action/unequip";
  const method: SupportedMethod = "POST";
  const body = { slot };
  return call(getCallerName(), { method, path, body });
}

export function discard(code: string, quantity: number) {
  const path = "my/:character/action/delete";
  const method: SupportedMethod = "POST";
  const body = { code, quantity };
  return call(getCallerName(), { method, path, body });
}

export default { equip, unequip, discard };
