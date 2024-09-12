import { actionCall } from "../http";
import type { CallOptions, GETransactionItem, GETransactionList, HasClient } from "../index";
import { getCallerName } from "../util";

export const exchangeActions = { buy, sell };

function buy(this: HasClient, body: GETransactionItem) {
  const method = "POST";
  const path = "/my/{name}/action/ge/buy";
  const opts: CallOptions = { auth: true, method, path, body, client: this.client };
  return actionCall<GETransactionList>(getCallerName(), opts);
}

function sell(this: HasClient, body: GETransactionItem) {
  const method = "POST";
  const path = "/my/{name}/action/ge/sell";
  const opts: CallOptions = { auth: true, method, path, body, client: this.client };
  return actionCall<GETransactionList>(getCallerName(), opts);
}
