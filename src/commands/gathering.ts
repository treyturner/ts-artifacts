import { type SupportedMethod, call, request } from "../util";

export async function gather() {
  const path = "my/:character/action/gathering";
  const method: SupportedMethod = "POST";
  return call({ method, path });
}

let cooldown: number;

export async function gatherRepeatedly() {
  const path = "my/:character/action/gathering";
  const method: SupportedMethod = "POST";
  const response = await request({ method, path });
  switch (response.status) {
    case 498: {
      console.log("The character cannot be found on your account.");
      break;
    }
    case 497: {
      console.log("Your character's inventory is full.");
      break;
    }
    case 499: {
      console.log("Your character is in cooldown.");
      break;
    }
    case 493: {
      console.log("The resource is too high-level for your character.");
      break;
    }
    case 598: {
      console.log("No resource on this map.");
      break;
    }
    case 200: {
      const body = (await response.json()) as {
        data: { cooldown: { total_seconds: number } };
      };

      console.log("Your character successfully gathered the resource.");

      cooldown = body.data.cooldown.total_seconds;
      setTimeout(gatherRepeatedly, cooldown * 1000);
      break;
    }
    default: {
      console.log("An error occurred while gathering the resource.");
    }
  }
}

export default { gather, gatherRepeatedly };
