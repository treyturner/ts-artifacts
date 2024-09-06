import type { HasClient } from "..";
import { actionCall } from "../http";
import type {
  CallOptions,
  DeleteItem,
  DeleteReq,
  Equip,
  EquipReq,
  EquipSlot,
  RecycleReq,
  RecyclingData,
  UnequipReq,
} from "../index";
import { getCallerName } from "../util";

export const itemActions = { discard, equip, recycle, unequip };

function equip(this: HasClient, slot: EquipSlot, code: string, quantity?: number) {
  const method = "POST";
  const path = "/my/{name}/action/equip";
  const body: EquipReq = { slot, code, quantity };
  const opts: CallOptions = { method, path, body, config: this.client.config };
  return actionCall<Equip>(getCallerName(), opts);
}

function unequip(this: HasClient, slot: EquipSlot) {
  const method = "POST";
  const path = "/my/{name}/action/unequip";
  const body: UnequipReq = { slot };
  const opts: CallOptions = { method, path, body, config: this.client.config };
  return actionCall<Equip>(getCallerName(), opts);
}

function discard(this: HasClient, body: DeleteReq) {
  const method = "POST";
  const path = "/my/{name}/action/delete";
  const opts: CallOptions = { method, path, body, config: this.client.config };
  return actionCall<DeleteItem>(getCallerName(), opts);
}

function recycle(this: HasClient, body: RecycleReq) {
  const method = "POST";
  const path = "/my/{name}/action/recycling";
  const opts: CallOptions = { method, path, body, config: this.client.config };
  return actionCall<RecyclingData>(getCallerName(), opts);
}
