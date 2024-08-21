import bank from "./commands/bank";
import { craft } from "./commands/crafting";
import events from "./commands/events";
import fight from "./commands/fighting";
import gather from "./commands/gathering";
import ge from "./commands/grand-exchange";
import items from "./commands/items";
import maps from "./commands/maps";
import { move } from "./commands/movement";
import resources from "./commands/resources";
import tasks from "./commands/tasks";
import { getCallerName, log, pp } from "./util";

/**
 * Temporary entrypoint: a scripted series of commands
 */

// await fight.once();

// await gather.continuously();

// await move(2, 1);
// await items.unequip("weapon");
// await craft("wooden_staff");
// await items.equip("weapon", "wooden_staff");

await move(0, 0);
const copperRocks = (await maps.getAll({ content_type: "resource", content_code: "copper_rocks" })).at(0);
await move(copperRocks);
await gather.once();
