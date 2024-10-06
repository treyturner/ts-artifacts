import type { CooldownSchema } from "./CooldownSchema.js";
import type { RecyclingItemsSchema } from "./RecyclingItemsSchema.js";
import type { CharacterSchema } from "./CharacterSchema.js";

export type RecyclingDataSchema = {
  cooldown: CooldownSchema;
  details: RecyclingItemsSchema;
  character: CharacterSchema;
};
