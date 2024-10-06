import type { CooldownSchema } from "./CooldownSchema.js";
import type { ItemSchema } from "./ItemSchema.js";
import type { CharacterSchema } from "./CharacterSchema.js";

export type EquipRequestSchema = {
  cooldown: CooldownSchema;
  slot:
    | "weapon"
    | "shield"
    | "helmet"
    | "body_armor"
    | "leg_armor"
    | "boots"
    | "ring1"
    | "ring2"
    | "amulet"
    | "artifact1"
    | "artifact2"
    | "artifact3"
    | "consumable1"
    | "consumable2";
  item: ItemSchema;
  character: CharacterSchema;
};
