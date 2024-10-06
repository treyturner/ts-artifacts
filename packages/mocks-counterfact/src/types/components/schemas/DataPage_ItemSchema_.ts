import type { ItemSchema } from "./ItemSchema.js";

export type DataPage_ItemSchema_ = {
  data: Array<ItemSchema>;
  total: number | null;
  page: number | null;
  size: number | null;
  pages?: number | null;
};
