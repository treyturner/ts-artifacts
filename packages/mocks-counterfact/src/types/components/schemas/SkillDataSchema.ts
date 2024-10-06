import type { CooldownSchema } from "./CooldownSchema.js";
import type { SkillInfoSchema } from "./SkillInfoSchema.js";
import type { CharacterSchema } from "./CharacterSchema.js";

export type SkillDataSchema = {
  cooldown: CooldownSchema;
  details: SkillInfoSchema;
  character: CharacterSchema;
};
