import type { CooldownSchema } from "./CooldownSchema.js";
import type { FightSchema } from "./FightSchema.js";
import type { CharacterSchema } from "./CharacterSchema.js";

export type CharacterFightDataSchema = {
  cooldown: CooldownSchema;
  fight: FightSchema;
  character: CharacterSchema;
};
