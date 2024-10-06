import type { CooldownSchema } from "./CooldownSchema.js";
import type { GoldSchema } from "./GoldSchema.js";
import type { CharacterSchema } from "./CharacterSchema.js";

export type BankGoldTransactionSchema = {
  cooldown: CooldownSchema;
  bank: GoldSchema;
  character: CharacterSchema;
};
