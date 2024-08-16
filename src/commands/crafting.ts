import type { SkillData } from "../types";
import { call, getCallerName } from "../util";

export function craft(code: string, quantity = 1) {
  const path = "/my/{name}/action/crafting";
  const method = "POST";
  const body = { code, quantity };
  return call<SkillData>(getCallerName(), { method, path, body });
}

export default { craft };
