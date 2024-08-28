import { actionCall, handleResponse, request } from "../http";
import type { SkillData } from "../types";
import { getCallerName, grammarJoin, log } from "../util";

export const gather = { continuously, once };

function once() {
  const method = "POST";
  const path = "/my/{name}/action/gathering";
  return actionCall<SkillData>(getCallerName(), { method, path });
}

async function continuously() {
  const method = "POST";
  const path = "/my/{name}/action/gathering";
  const response = await request(getCallerName(), { method, path });
  const callerName = getCallerName();
  switch (response.status) {
    case 498: {
      log(callerName, "The character cannot be found on your account.");
      break;
    }
    case 497: {
      log(callerName, "Your character's inventory is full.");
      break;
    }
    case 499: {
      log(callerName, "Your character is in cooldown.");
      break;
    }
    case 493: {
      log(callerName, "The resource is too high-level for your character.");
      break;
    }
    case 598: {
      log(callerName, "No resource on this map.");
      break;
    }
    case 200: {
      const data = await handleResponse<SkillData>(callerName, response, { method, path });
      const list = data && data.details.items.length > 0 ? ` ${grammarJoin(data?.details.items)}` : "";
      const xp = data?.details.xp ? `, gaining ${data?.details.xp} xp` : "";
      log(callerName, `Your character successfully gathered${list}${xp}.`);
      return continuously();
    }
    default: {
      log(callerName, "An error occurred while gathering the resource.");
    }
  }
  return response;
}
