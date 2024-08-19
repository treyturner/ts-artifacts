import { call } from "../http";
import type { GrandExchangeTxnItem, GrandExchangeTxnList } from "../types";
import { getCallerName } from "../util";

export function buy(code: string, quantity: number, price: number) {
  const method = "POST";
  const path = "/my/{name}/action/ge/buy";
  const body: GrandExchangeTxnItem = { code, quantity, price };
  return call<GrandExchangeTxnList>(getCallerName(), { method, path, body });
}

export function sell(code: string, quantity: number, price: number) {
  const method = "POST";
  const path = "/my/{name}/action/ge/sell";
  const body: GrandExchangeTxnItem = { code, quantity, price };
  return call<GrandExchangeTxnList>(getCallerName(), { method, path, body });
}

export default { buy, sell };
