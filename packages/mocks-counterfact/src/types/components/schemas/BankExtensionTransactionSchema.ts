import type { CooldownSchema } from "./CooldownSchema.js";
import type { BankExtensionSchema } from "./BankExtensionSchema.js";
import type { CharacterSchema } from "./CharacterSchema.js";

export type BankExtensionTransactionSchema = {
  cooldown: CooldownSchema;
  transaction: BankExtensionSchema;
  character: CharacterSchema;
};
