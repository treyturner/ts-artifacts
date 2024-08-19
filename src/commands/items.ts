import { call, callForInfo, callForPage, handlePaging } from "../http";
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
  SingleItem,
  UnequipReq,
} from "../types";
import { getCallerName } from "../util";

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

/** Get a single item by code */
export async function getItem(query: ItemReq) {
  const method = "GET";
  const path = `/item/${query.code}`;
  return callForInfo<SingleItem>(getCallerName(), { method, path });
}

/**
 * Get a data page of a list of items, potentially filtered by a query.
 * Intended to be wrapped by `handlePaging()`
 **/
async function getItemsPage(query: ItemsReq = {}) {
  const method = "GET";
  const path = "/items/";
  return callForPage<DataPage<Item>>(getCallerName(), { method, path, query });
}

/**
 * Return a complete set of items matching the query,
 * collected across multiple pages of results as needed
 */
export async function getItems(query?: Omit<NonNullable<ItemsReq>, "page" | "size">) {
  return handlePaging<Item, ItemsReq>(getItemsPage, query);
}

export default { equip, unequip, discard, get: getItem, getAll: getItems };
