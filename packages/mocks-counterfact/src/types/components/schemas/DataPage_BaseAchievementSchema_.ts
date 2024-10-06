import type { BaseAchievementSchema } from "./BaseAchievementSchema.js";

export type DataPage_BaseAchievementSchema_ = {
  data: Array<BaseAchievementSchema>;
  total: number | null;
  page: number | null;
  size: number | null;
  pages?: number | null;
};
