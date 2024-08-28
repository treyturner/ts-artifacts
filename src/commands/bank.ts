import { actionCall, handlePaging, infoCall, pageCall } from "../http";
import type {
  Bank,
  BankExtensionTransaction,
  BankItem,
  BankItemsReq,
  DataPage,
  Gold,
  GoldReq,
  GoldTransaction,
  SimpleItem,
} from "../types";
import { getCallerName } from "../util";

export const bank = {
  buyExpansion,
  get: {
    details: getDetails,
    balance: getBalance,
    items: getItems,
  },
  deposit: {
    gold: depositGold,
    item: depositItem,
    items: depositItems,
  },
  withdraw: {
    gold: withdrawGold,
    item: withdrawItem,
    items: withdrawItems,
  },
};

function getBalance() {
  const method = "GET";
  const path = "/my/bank/gold";
  return infoCall<Gold>(getCallerName(), { method, path });
}

function depositGold(body: GoldReq) {
  const method = "POST";
  const path = "/my/{name}/action/bank/deposit/gold";
  return actionCall<GoldTransaction>(getCallerName(), { method, path, body });
}

function withdrawGold(body: GoldReq) {
  const method = "POST";
  const path = "/my/{name}/action/bank/withdraw/gold";
  return actionCall<GoldTransaction>(getCallerName(), { method, path, body });
}

function getItems(query?: Omit<NonNullable<BankItemsReq>, "page" | "size">) {
  const getItemsPage = (query: BankItemsReq) => {
    const method = "GET";
    const path = "/my/bank/items";
    return pageCall<DataPage<SimpleItem>>(getCallerName(), { method, path, query });
  };
  return handlePaging<SimpleItem, BankItemsReq>(getCallerName(), getItemsPage, query);
}

function depositItem(body: SimpleItem) {
  const method = "POST";
  const path = "/my/{name}/action/bank/deposit";
  return actionCall<BankItem>(getCallerName(), { method, path, body });
}

function depositItems(bodies: SimpleItem[]) {
  return Promise.all(bodies.map(async (body) => depositItem(body)));
}

function withdrawItem(body: SimpleItem) {
  const method = "POST";
  const path = "/my/{name}/action/bank/withdraw";
  return actionCall<BankItem>(getCallerName(), { method, path, body });
}

function withdrawItems(bodies: SimpleItem[]) {
  return Promise.all(bodies.map(async (body) => withdrawItem(body)));
}

function buyExpansion() {
  const method = "POST";
  const path = "/my/{name}/action/bank/buy_expansion";
  return actionCall<BankExtensionTransaction>(getCallerName(), { method, path });
}

function getDetails() {
  const method = "POST";
  const path = "/my/bank";
  return infoCall<Bank>(getCallerName(), { method, path });
}
