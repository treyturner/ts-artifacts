import { actionCall } from "../http";
import type { CallOptions, CraftReq, HasClient, SkillData } from "../index";
import { getCallerName } from "../util";

export const craftActions = { once };

function once(this: HasClient, code: string, quantity = 1) {
  const method = "POST";
  const path = "/my/{name}/action/crafting";
  const body: CraftReq = { code, quantity };
  const opts: CallOptions = { auth: true, method, path, body, client: this.client };
  return actionCall<SkillData>(getCallerName(), opts);
}
