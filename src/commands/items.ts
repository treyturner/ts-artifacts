import type { DeleteItem, DeleteReq, Equip, EquipReq, EquipSlot, Schemas, UnequipReq } from "../types";
import { call, getCallerName } from "../util";

export function equip(code: string, slot: EquipSlot) {
  const method = "POST";
  const path = "/my/{name}/action/equip";
  const body: EquipReq = { code, slot };
  return call<Equip>(getCallerName(), { method, path, body });
}

export function unequip(slot: EquipSlot) {
  const method = "POST";
  const path = "/my/{name}/action/unequip";
  const body: UnequipReq = { slot };
  return call<Equip>(getCallerName(), { method, path, body });
}

export function discard(code: string, quantity: number) {
  const method = "POST";
  const path = "/my/{name}/action/delete";
  const body: DeleteReq = { code, quantity };
  return call<DeleteItem>(getCallerName(), { method, path, body });
}

export default { equip, unequip, discard };
