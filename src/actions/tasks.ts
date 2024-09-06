import type { HasClient } from "..";
import { actionCall } from "../http";
import type { CallOptions, TaskCancelled, TaskData, TaskRewardData } from "../index";
import { getCallerName } from "../util";

export const taskActions = { accept, cancel, complete, exchange };

function accept(this: HasClient) {
  const method = "POST";
  const path = "/my/{name}/action/task/new";
  const opts: CallOptions = { method, path, config: this.client.config };
  return actionCall<TaskData>(getCallerName(), opts);
}

function exchange(this: HasClient) {
  const method = "POST";
  const path = "/my/{name}/action/task/exchange";
  const opts: CallOptions = { method, path, config: this.client.config };
  return actionCall<TaskRewardData>(getCallerName(), opts);
}

function complete(this: HasClient) {
  const method = "POST";
  const path = "/my/{name}/action/task/complete";
  const opts: CallOptions = { method, path, config: this.client.config };
  return actionCall<TaskRewardData>(getCallerName(), opts);
}

function cancel(this: HasClient) {
  const method = "POST";
  const path = "/my/{name}/action/task/cancel";
  const opts: CallOptions = { method, path, config: this.client.config };
  return actionCall<TaskCancelled>(getCallerName(), opts);
}
