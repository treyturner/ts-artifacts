import type { HasClient } from "..";
import { type CallOptions, actionCall } from "../http";
import type { BankExtensionTransaction, BankItem, GoldReq, GoldTransaction, Item, SimpleItem } from "../types";
import { getCallerName } from "../util";

export const bankActions = {
  buyExpansion,
  depositGold,
  depositItem,
  depositItems,
  withdrawGold,
  withdrawItem,
  withdrawItems,
};

function buyExpansion(this: HasClient) {
  const method = "POST";
  const path = "/my/{name}/action/bank/buy_expansion";
  const opts: CallOptions = { method, path, config: this.client.config };
  return actionCall<BankExtensionTransaction>(getCallerName(), opts);
}

function depositGold(this: HasClient, body: GoldReq) {
  const method = "POST";
  const path = "/my/{name}/action/bank/deposit/gold";
  const opts: CallOptions = { method, path, body, config: this.client.config };
  return actionCall<GoldTransaction>(getCallerName(), opts);
}

function depositItem(this: HasClient, body: SimpleItem) {
  const method = "POST";
  const path = "/my/{name}/action/bank/deposit";
  const opts: CallOptions = { method, path, body, config: this.client.config };
  return actionCall<BankItem>(getCallerName(), opts);
}

function depositItems(this: HasClient, bodies: SimpleItem[]) {
  return bulkItemTxn(depositItem, bodies);
}

function withdrawGold(this: HasClient, body: GoldReq) {
  const method = "POST";
  const path = "/my/{name}/action/bank/withdraw/gold";
  const opts: CallOptions = { method, path, body, config: this.client.config };
  return actionCall<GoldTransaction>(getCallerName(), opts);
}

function withdrawItem(this: HasClient, body: SimpleItem) {
  const method = "POST";
  const path = "/my/{name}/action/bank/withdraw";
  const opts: CallOptions = { method, path, body, config: this.client.config };
  return actionCall<BankItem>(getCallerName(), opts);
}

function withdrawItems(bodies: SimpleItem[]) {
  return bulkItemTxn(withdrawItem, bodies);
}

async function bulkItemTxn(txnFn: (body: SimpleItem) => Promise<BankItem | null>, bodies: SimpleItem[]) {
  const items: Item[] = [];
  let lastResult: Omit<BankItem, "item"> | undefined;
  for (const body of bodies) {
    const data = await txnFn(body);
    if (data?.item) {
      const { item, ...rest } = data;
      if (item) {
        lastResult = rest;
        items.push(data.item);
      }
    }
  }
  if (items.length > 0) return { ...lastResult, items };
}
