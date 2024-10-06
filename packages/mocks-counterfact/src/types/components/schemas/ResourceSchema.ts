import type { DropRateSchema } from "./DropRateSchema.js";

export type ResourceSchema = {
  name: string;
  code: string;
  skill: "mining" | "woodcutting" | "fishing";
  level: number;
  drops: Array<DropRateSchema>;
};
