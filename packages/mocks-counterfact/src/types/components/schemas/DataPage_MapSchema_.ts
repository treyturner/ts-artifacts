import type { MapSchema } from "./MapSchema.js";

export type DataPage_MapSchema_ = {
  data: Array<MapSchema>;
  total: number | null;
  page: number | null;
  size: number | null;
  pages?: number | null;
};
