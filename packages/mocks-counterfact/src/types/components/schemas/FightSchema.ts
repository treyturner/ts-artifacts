import type { DropSchema } from "./DropSchema.js";
import type { BlockedHitsSchema } from "./BlockedHitsSchema.js";

export type FightSchema = {
  xp: number;
  gold: number;
  drops: Array<DropSchema>;
  turns: number;
  monster_blocked_hits: BlockedHitsSchema;
  player_blocked_hits: BlockedHitsSchema;
  logs: Array<string>;
  result: "win" | "lose";
};
