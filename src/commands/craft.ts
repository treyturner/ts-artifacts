import { actionCall } from "../http";
import type { CraftReq, SkillData } from "../types";
import { getCallerName } from "../util";

export const craft = { once };

function once(code: string, quantity = 1) {
  const method = "POST";
  const path = "/my/{name}/action/crafting";
  const body: CraftReq = { code, quantity };
  return actionCall<SkillData>(getCallerName(), { method, path, body });
}
