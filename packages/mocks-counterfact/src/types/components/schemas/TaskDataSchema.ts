import type { CooldownSchema } from "./CooldownSchema.js";
import type { TaskSchema } from "./TaskSchema.js";
import type { CharacterSchema } from "./CharacterSchema.js";

export type TaskDataSchema = {
  cooldown: CooldownSchema;
  task: TaskSchema;
  character: CharacterSchema;
};
