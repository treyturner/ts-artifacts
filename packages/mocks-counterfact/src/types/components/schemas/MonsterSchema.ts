import type { DropRateSchema } from "./DropRateSchema.js";

export type MonsterSchema = {
  name: string;
  code: string;
  level: number;
  hp: number;
  attack_fire: number;
  attack_earth: number;
  attack_water: number;
  attack_air: number;
  res_fire: number;
  res_earth: number;
  res_water: number;
  res_air: number;
  min_gold: number;
  max_gold: number;
  drops: Array<DropRateSchema>;
};
