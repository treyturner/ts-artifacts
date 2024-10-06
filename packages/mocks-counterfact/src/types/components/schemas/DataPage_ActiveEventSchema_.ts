import type { ActiveEventSchema } from "./ActiveEventSchema.js";

export type DataPage_ActiveEventSchema_ = {
  data: Array<ActiveEventSchema>;
  total: number | null;
  page: number | null;
  size: number | null;
  pages?: number | null;
};
