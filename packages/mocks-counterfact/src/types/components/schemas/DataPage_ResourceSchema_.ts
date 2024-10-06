import type { ResourceSchema } from "./ResourceSchema.js";

export type DataPage_ResourceSchema_ = {
  data: Array<ResourceSchema>;
  total: number | null;
  page: number | null;
  size: number | null;
  pages?: number | null;
};
