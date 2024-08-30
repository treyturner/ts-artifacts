import type { HasClient } from "..";
import { type CallOptions, actionCall } from "../http";
import type { CraftReq, SkillData } from "../types";
import { getCallerName } from "../util";

export const craftActions = { once };

function once(this: HasClient, code: string, quantity = 1) {
  const method = "POST";
  const path = "/my/{name}/action/crafting";
  const body: CraftReq = { code, quantity };
  const opts: CallOptions = { method, path, body, config: this.client.config };
  return actionCall<SkillData>(getCallerName(), opts);
}
