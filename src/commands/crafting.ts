import type { CraftReq, SkillData } from "../types";
import { call, getCallerName } from "../util";

export function craft(code: string, quantity = 1) {
  const method = "POST";
  const path = "/my/{name}/action/crafting";
  const body: CraftReq = { code, quantity };
  return call<SkillData>(getCallerName(), { method, path, body });
}

export default { craft };
