import type { CooldownSchema } from "./CooldownSchema.js";
import type { ItemSchema } from "./ItemSchema.js";
import type { SimpleItemSchema } from "./SimpleItemSchema.js";
import type { CharacterSchema } from "./CharacterSchema.js";

export type BankItemTransactionSchema = {
  cooldown: CooldownSchema;
  item: ItemSchema;
  bank: Array<SimpleItemSchema>;
  character: CharacterSchema;
};
