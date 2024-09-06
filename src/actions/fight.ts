import type { HasClient } from "..";
import { actionCall, handleResponse, request } from "../http";
import type { CallOptions, CharacterFightData } from "../index";
import { getCallerName, log } from "../util";

export const fightActions = { continuously, once };

function once(this: HasClient) {
  const method = "POST";
  const path = "/my/{name}/action/fight";
  const opts: CallOptions = { method, path, config: this.client.config };
  return actionCall<CharacterFightData>(getCallerName(), opts);
}

async function continuously(this: HasClient): Promise<Response> {
  const method = "POST";
  const path = "/my/{name}/action/fight";
  const opts: CallOptions = { method, path, config: this.client.config };
  const response = await request(getCallerName(), opts);
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
      const opts: CallOptions = { method, path, config: this.client.config };
      const data = await handleResponse<CharacterFightData>(callerName, response, opts);
      log(callerName, `The fight ended successfully.${data?.fight.result ? ` You have ${data.fight.result}.` : ""}`);
      return continuously.call(this);
    }
    default:
      log(callerName, "An error occurred during the fight.");
  }
  return response;
}
