import type { CooldownSchema } from "./CooldownSchema.js";
import type { MapSchema } from "./MapSchema.js";
import type { CharacterSchema } from "./CharacterSchema.js";

export type CharacterMovementDataSchema = {
  cooldown: CooldownSchema;
  destination: MapSchema;
  character: CharacterSchema;
};
