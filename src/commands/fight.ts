import { actionCall, handleResponse, request } from "../http";
import type { CharacterFightData } from "../types";
import { getCallerName, log } from "../util";

export const fight = { continuously, once };

function once() {
  const method = "POST";
  const path = "/my/{name}/action/fight";
  return actionCall<CharacterFightData>(getCallerName(), { method, path });
}

async function continuously() {
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
      return continuously();
    }
    default:
      log(callerName, "An error occurred during the fight.");
  }
  return response;
}
