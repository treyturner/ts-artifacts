import type { MonsterSchema } from "./MonsterSchema.js";

export type DataPage_MonsterSchema_ = {
  data: Array<MonsterSchema>;
  total: number | null;
  page: number | null;
  size: number | null;
  pages?: number | null;
};
