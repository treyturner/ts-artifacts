import type { SimpleItemSchema } from "./SimpleItemSchema.js";

export type DataPage_SimpleItemSchema_ = {
  data: Array<SimpleItemSchema>;
  total: number | null;
  page: number | null;
  size: number | null;
  pages?: number | null;
};
