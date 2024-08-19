import { call } from "../http";
import type { CraftReq, SkillData } from "../types";
import { getCallerName } from "../util";

export function craft(body: CraftReq) {
  const method = "POST";
  const path = "/my/{name}/action/crafting";
  return call<SkillData>(getCallerName(), { method, path, body });
}

export default { craft };
