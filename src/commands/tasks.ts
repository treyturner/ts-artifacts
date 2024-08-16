import { call, getCallerName } from "../util";

export function accept() {
  const method = "POST";
  const path = "my/{name}/action/task/exchange";
  return call(getCallerName(), { method, path });
}

export function exchange() {
  const method = "POST";
  const path = "my/{name}/action/task/exchange";
  return call(getCallerName(), { method, path });
}

export function complete() {
  const method = "POST";
  const path = "my/{name}/action/task/complete";
  return call(getCallerName(), { method, path });
}

export default { accept, exchange, complete };
