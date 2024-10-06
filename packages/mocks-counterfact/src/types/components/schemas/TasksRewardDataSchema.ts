import type { CooldownSchema } from "./CooldownSchema.js";
import type { TasksRewardSchema } from "./TasksRewardSchema.js";
import type { CharacterSchema } from "./CharacterSchema.js";

export type TasksRewardDataSchema = {
  cooldown: CooldownSchema;
  reward: TasksRewardSchema;
  character: CharacterSchema;
};
