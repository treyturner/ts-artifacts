import type { CooldownSchema } from "./CooldownSchema.js";
import type { TaskTradeSchema } from "./TaskTradeSchema.js";
import type { CharacterSchema } from "./CharacterSchema.js";

export type TaskTradeDataSchema = {
  cooldown: CooldownSchema;
  trade: TaskTradeSchema;
  character: CharacterSchema;
};
