import type { LogSchema } from "./LogSchema.js";

export type DataPage_LogSchema_ = {
  data: Array<LogSchema>;
  total: number | null;
  page: number | null;
  size: number | null;
  pages?: number | null;
};
