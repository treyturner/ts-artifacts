import type { CooldownSchema } from "./CooldownSchema.js";
import type { GETransactionSchema } from "./GETransactionSchema.js";
import type { CharacterSchema } from "./CharacterSchema.js";

export type GETransactionListSchema = {
  cooldown: CooldownSchema;
  transaction: GETransactionSchema;
  character: CharacterSchema;
};
