import type { ItemSchema } from "./ItemSchema.js";
import type { GEItemSchema } from "./GEItemSchema.js";

export type SingleItemSchema = { item: ItemSchema; ge?: GEItemSchema | null };
