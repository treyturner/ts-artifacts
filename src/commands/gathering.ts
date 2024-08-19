import { call, handleResponse, request } from "../http";
import type { SkillData } from "../types";
import { getCallerName, log } from "../util";

export function gather() {
  const method = "POST";
  const path = "/my/{name}/action/gathering";
  return call<SkillData>(getCallerName(), { method, path });
}

let cooldown: number;

export async function gatherRepeatedly() {
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
      const data = await handleResponse<SkillData>(callerName, response);
      log(
        callerName,
        `Your character successfully gathered ${data.details.items
          .map((i) => `${i.quantity}x ${i.code}`)
          .join(", ")}, gaining ${data.details.xp} xp.`,
      );
      return gatherRepeatedly();
    }
    default: {
      log(callerName, "An error occurred while gathering the resource.");
    }
  }
  return response;
}

export default { gather, gatherRepeatedly };
