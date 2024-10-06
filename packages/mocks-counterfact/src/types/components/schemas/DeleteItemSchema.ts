import type { CooldownSchema } from "./CooldownSchema.js";
import type { SimpleItemSchema } from "./SimpleItemSchema.js";
import type { CharacterSchema } from "./CharacterSchema.js";

export type DeleteItemSchema = {
  cooldown: CooldownSchema;
  item: SimpleItemSchema;
  character: CharacterSchema;
};
