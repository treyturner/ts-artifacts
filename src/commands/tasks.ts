import { call } from "../http";
import type { TaskData, TaskRewardData } from "../types";
import { getCallerName } from "../util";

export function accept() {
  const method = "POST";
  const path = "/my/{name}/action/task/exchange";
  return call<TaskData>(getCallerName(), { method, path });
}

export function exchange() {
  const method = "POST";
  const path = "/my/{name}/action/task/exchange";
  return call<TaskRewardData>(getCallerName(), { method, path });
}

export function complete() {
  const method = "POST";
  const path = "/my/{name}/action/task/complete";
  return call<TaskRewardData>(getCallerName(), { method, path });
}

export default { accept, exchange, complete };
