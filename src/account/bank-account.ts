import type { HasClient } from "..";
import { handlePaging, infoCall, pageCall } from "../http";
import type { Bank, BankItemsReq, CallOptions, DataPage, DataPageQuery, Gold, SimpleItem } from "../index";
import { getCallerName } from "../util";

export const accountBank = { getDetails, getItems };

async function getDetails(this: HasClient) {
  const method = "GET";
  const path = "/my/bank";
  const opts: CallOptions = { method, path, config: this.client.config };
  const responseBody = await infoCall<{ data: Bank }>(getCallerName(), opts);
  return responseBody.data;
}

function getItems(this: HasClient, query?: DataPageQuery<BankItemsReq>) {
  const getItemsPage = (query: BankItemsReq) => {
    const method = "GET";
    const path = "/my/bank/items";
    const opts: CallOptions = { method, path, query, config: this.client.config };
    return pageCall<DataPage<SimpleItem>>(getCallerName(), opts);
  };

  return handlePaging<SimpleItem, BankItemsReq>(this.client.config, getCallerName(), getItemsPage, query);
}
