import { call, getCallerName, request } from "../util";

export function fight() {
  const path = "/my/{name}/action/fight";
  const method = "POST";
  return call(getCallerName(), { method, path });
}

let cooldown: number;

export async function fightRepeatedly() {
  const path = "/my/{name}/action/fight";
  const method = "POST";

  const response = await request(getCallerName(), { method, path });
  switch (response.status) {
    case 498: {
      console.log("The character cannot be found on your account.");
      return;
    }
    case 497: {
      console.log("Your character's inventory is full.");
      break;
    }
    case 499: {
      console.log("Your character is in cooldown.");
      break;
    }
    case 598: {
      console.log("No monster on this map.");
      break;
    }
    case 200: {
      const body = (await response.json()) as {
        data: {
          fight: {
            result: string;
          };
          cooldown: {
            total_seconds: number;
          };
        };
      };

      console.log(`The fight ended successfully. You have ${body.data.fight.result}.`);

      cooldown = body.data.cooldown.total_seconds;
      setTimeout(fightRepeatedly, cooldown * 1000);
      break;
    }
    default:
      console.log("An error occurred during the fight.");
  }
}

export default { fight, fightRepeatedly };
