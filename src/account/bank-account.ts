import type { HasClient } from "..";
import { type CallOptions, handlePaging, infoCall, pageCall } from "../http";
import type { Bank, BankItemsReq, DataPage, Gold, SimpleItem } from "../types";
import { getCallerName } from "../util";

export const accountBank = { getDetails, getItems };

async function getDetails(this: HasClient) {
  const method = "POST";
  const path = "/my/bank";
  const opts: CallOptions = { method, path, config: this.client.config };
  const responseBody = await infoCall<{ data: Bank }>(getCallerName(), opts);
  return responseBody.data;
}

function getItems(this: HasClient, query?: Omit<NonNullable<BankItemsReq>, "page" | "size">) {
  const getItemsPage = (query: BankItemsReq) => {
    const method = "GET";
    const path = "/my/bank/items";
    const opts: CallOptions = { method, path, query, config: this.client.config };
    return pageCall<DataPage<SimpleItem>>(getCallerName(), opts);
  };

  return handlePaging<SimpleItem, BankItemsReq>(this.client.config, getCallerName(), getItemsPage, query);
}
