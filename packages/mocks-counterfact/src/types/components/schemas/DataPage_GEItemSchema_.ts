import type { GEItemSchema } from "./GEItemSchema.js";

export type DataPage_GEItemSchema_ = {
  data: Array<GEItemSchema>;
  total: number | null;
  page: number | null;
  size: number | null;
  pages?: number | null;
};
