import { actionCall } from "../http";
import type { TaskCancelled, TaskData, TaskRewardData } from "../types";
import { getCallerName } from "../util";

export const tasks = { accept, cancel, complete, exchange };

function accept() {
  const method = "POST";
  const path = "/my/{name}/action/task/new";
  return actionCall<TaskData>(getCallerName(), { method, path });
}

function exchange() {
  const method = "POST";
  const path = "/my/{name}/action/task/exchange";
  return actionCall<TaskRewardData>(getCallerName(), { method, path });
}

function complete() {
  const method = "POST";
  const path = "/my/{name}/action/task/complete";
  return actionCall<TaskRewardData>(getCallerName(), { method, path });
}

function cancel() {
  const method = "POST";
  const path = "/my/{name}/action/task/cancel";
  return actionCall<TaskCancelled>(getCallerName(), { method, path });
}
