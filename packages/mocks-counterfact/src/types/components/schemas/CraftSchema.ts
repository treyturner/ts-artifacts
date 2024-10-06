import type { SimpleItemSchema } from "./SimpleItemSchema.js";

export type CraftSchema = {
  skill?: "weaponcrafting" | "gearcrafting" | "jewelrycrafting" | "cooking" | "woodcutting" | "mining";
  level?: number;
  items?: Array<SimpleItemSchema>;
  quantity?: number;
};
