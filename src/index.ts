import bank from "./commands/bank";
import { craft } from "./commands/crafting";
import events from "./commands/events";
import fight from "./commands/fighting";
import gather from "./commands/gathering";
import ge from "./commands/grand-exchange";
import items from "./commands/items";
import maps from "./commands/maps";
import { move } from "./commands/movement";
import tasks from "./commands/tasks";
import { getCallerName, log, pp } from "./util";

/**
 * Temporary entrypoint: a scripted series of commands
 */

// await fight.once();

// await move(-1, 0);
// await gather.continuously();

// await move(2, 1);
// await items.unequip("weapon");
// await craft("wooden_staff");
// await items.equip("weapon", "wooden_staff");

const q = [events.getAll()];

for (const p of q) {
  log(getCallerName(), pp(await p));
}
