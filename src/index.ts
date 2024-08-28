import {
  account,
  bank,
  characters,
  craft,
  exchange,
  fight,
  gather,
  items,
  maps,
  meta,
  monsters,
  move,
  resources,
  tasks,
} from "./commands";
import { config } from "./config";
import type { Character } from "./types";

async function initClient() {
  config.apiToken ??= await account.getToken();
  return await characters.getAll();
}

/**
 * Temporary entrypoint: a scripted series of commands
 */
const party: Character[] = await initClient();

await fight.once();

await gather.continuously();

await move.to(2, 1);
await items.unequip("weapon");
await craft.once("wooden_staff");
await items.equip("weapon", "wooden_staff");

await move.to(0, 0);
await move.toA("resource", "copper_rocks");
await gather.once();
