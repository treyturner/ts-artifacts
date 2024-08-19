import { inspect } from "bun";
import bank from "./commands/bank";
import { craft } from "./commands/crafting";
import { getEvents } from "./commands/events";
import { fight, fightRepeatedly } from "./commands/fighting";
import { gather, gatherRepeatedly } from "./commands/gathering";
import grandExchange from "./commands/grand-exchange";
import items from "./commands/items";
import { getMap, getMaps } from "./commands/maps";
import { move } from "./commands/movement";
import tasks from "./commands/tasks";
import { getCallerName, log, pp } from "./util";

/**
 * Temporary entrypoint: a scripted series of commands
 */

// await fight();

// await move(-1, 0);
// await gatherRepeatedly();

// await move(2, 1);
// await items.unequip("weapon");
// await craft("wooden_staff");
// await items.equip("wooden_staff", "weapon");

const q = [
  // command queue
  // getMaps({ content_code: "ash_tree" }),
  getEvents(),
];

for (const p of q) {
  log(getCallerName(), pp(await p));
}
