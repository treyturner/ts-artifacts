import { call, handleResponse, request } from "../http";
import type { CharacterFightData } from "../types";
import { getCallerName, log } from "../util";

export function fight() {
  const method = "POST";
  const path = "/my/{name}/action/fight";
  return call<CharacterFightData>(getCallerName(), { method, path });
}

export async function fightContinuously() {
  const method = "POST";
  const path = "/my/{name}/action/fight";
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
    case 598: {
      log(callerName, "No monster on this map.");
      break;
    }
    case 200: {
      const data = await handleResponse<CharacterFightData>(callerName, response, { method, path });
      log(callerName, `The fight ended successfully.${data?.fight.result ? ` You have ${data.fight.result}.` : ""}`);
      return fightContinuously();
    }
    default:
      log(callerName, "An error occurred during the fight.");
  }
  return response;
}

export default { once: fight, continuously: fightContinuously };
