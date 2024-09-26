import { actionCall } from "../http";
import type {
  CallOptions,
  HasClient,
  SimpleItem,
  TaskCancelled,
  TaskData,
  TasksRewardData,
  TaskTradeData,
} from "../types";
import { getCallerName } from "../util";

export const taskActions = { accept, cancel, complete, exchange, trade };

function accept(this: HasClient) {
  const method = "POST";
  const path = "/my/{name}/action/task/new";
  const opts: CallOptions = { auth: true, method, path, client: this.client };
  return actionCall<TaskData>(getCallerName(), opts);
}

function exchange(this: HasClient) {
  const method = "POST";
  const path = "/my/{name}/action/task/exchange";
  const opts: CallOptions = { auth: true, method, path, client: this.client };
  return actionCall<TasksRewardData>(getCallerName(), opts);
}

function complete(this: HasClient) {
  const method = "POST";
  const path = "/my/{name}/action/task/complete";
  const opts: CallOptions = { auth: true, method, path, client: this.client };
  return actionCall<TasksRewardData>(getCallerName(), opts);
}

function trade(this: HasClient, body: SimpleItem) {
  const method = "POST";
  const path = "/my/{name}/action/task/trade";
  const opts: CallOptions = { auth: true, method, path, body, client: this.client };
  return actionCall<TaskTradeData>(getCallerName(), opts);
}

function cancel(this: HasClient) {
  const method = "POST";
  const path = "/my/{name}/action/task/cancel";
  const opts: CallOptions = { auth: true, method, path, client: this.client };
  return actionCall<TaskCancelled>(getCallerName(), opts);
}
