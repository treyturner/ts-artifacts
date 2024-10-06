import type { ItemEffectSchema } from "./ItemEffectSchema.js";
import type { CraftSchema } from "./CraftSchema.js";

export type ItemSchema = {
  name: string;
  code: string;
  level: number;
  type: string;
  subtype: string;
  description: string;
  effects?: Array<ItemEffectSchema>;
  craft?: CraftSchema | null;
};
