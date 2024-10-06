import type { CooldownSchema } from "./CooldownSchema.js";
import type { CharacterSchema } from "./CharacterSchema.js";

export type TaskCancelledSchema = {
  cooldown: CooldownSchema;
  character: CharacterSchema;
};
