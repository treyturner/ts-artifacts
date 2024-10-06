import type { TaskFullSchema } from "./TaskFullSchema.js";

export type DataPage_TaskFullSchema_ = {
  data: Array<TaskFullSchema>;
  total: number | null;
  page: number | null;
  size: number | null;
  pages?: number | null;
};
