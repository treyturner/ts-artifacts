import { actionCall, handlePaging, infoCall, pageCall } from "../http";
import type {
  DataPage,
  DeleteItem,
  DeleteReq,
  Equip,
  EquipReq,
  EquipSlot,
  Item,
  ItemReq,
  ItemsReq,
  RecycleReq,
  RecyclingData,
  SingleItem,
  UnequipReq,
} from "../types";
import { getCallerName } from "../util";

export const items = { discard, equip, get, getAll, recycle, unequip };

function equip(slot: EquipSlot, code: string, quantity?: number) {
  const method = "POST";
  const path = "/my/{name}/action/equip";
  const body: EquipReq = { slot, code, quantity };
  return actionCall<Equip>(getCallerName(), { method, path, body });
}

function unequip(slot: EquipSlot) {
  const method = "POST";
  const path = "/my/{name}/action/unequip";
  const body: UnequipReq = { slot };
  return actionCall<Equip>(getCallerName(), { method, path, body });
}

function discard(body: DeleteReq) {
  const method = "POST";
  const path = "/my/{name}/action/delete";
  return actionCall<DeleteItem>(getCallerName(), { method, path, body });
}

function recycle(body: RecycleReq) {
  const method = "POST";
  const path = "/my/{name}/action/recycling";
  return actionCall<RecyclingData>(getCallerName(), { method, path, body });
}

function get(query: ItemReq) {
  const method = "GET";
  const path = `/item/${query.code}`;
  return infoCall<SingleItem>(getCallerName(), { method, path });
}

function getAll(query?: Omit<NonNullable<ItemsReq>, "page" | "size">) {
  const getItemsPage = (query: ItemsReq = {}) => {
    const method = "GET";
    const path = "/items";
    return pageCall<DataPage<Item>>(getCallerName(), { method, path, query });
  };

  return handlePaging<Item, ItemsReq>(getCallerName(), getItemsPage, query);
}
