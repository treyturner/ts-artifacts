import type { AchievementSchema } from "./AchievementSchema.js";

export type DataPage_AchievementSchema_ = {
  data: Array<AchievementSchema>;
  total: number | null;
  page: number | null;
  size: number | null;
  pages?: number | null;
};
