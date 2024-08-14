import type { Slot } from "../types";
import { type SupportedMethod, call } from "../util";

export async function equip(code: string, slot: Slot) {
  const path = "my/:character/action/equip";
  const method: SupportedMethod = "POST";
  const body = { code, slot };
  return call({ method, path, body });
}

export async function unequip(slot: Slot) {
  const path = "my/:character/action/unequip";
  const method: SupportedMethod = "POST";
  const body = { slot };
  return call({ method, path, body });
}

export async function discard(code: string, quantity: number) {
  const path = "my/:character/action/delete";
  const method: SupportedMethod = "POST";
  const body = { code, quantity };
  return call({ method, path, body });
}

export default { equip, unequip, discard };
