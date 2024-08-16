import type { EquipRequest, EquipResponse, EquipSlot } from "../types";
import { call, getCallerName } from "../util";

export function equip(code: string, slot: EquipSlot) {
  const path = "/my/{name}/action/equip";
  const method = "POST";
  const body: EquipRequest = { code, slot };
  return call<EquipResponse>(getCallerName(), { method, path, body });
}

export function unequip(slot: EquipSlot) {
  const path = "/my/{name}/action/unequip";
  const method = "POST";
  const body = { slot };
  return call<EquipResponse>(getCallerName(), { method, path, body });
}

export function discard(code: string, quantity: number) {
  const path = "/my/{name}/action/delete";
  const method = "POST";
  const body = { code, quantity };
  return call(getCallerName(), { method, path, body });
}

export default { equip, unequip, discard };
