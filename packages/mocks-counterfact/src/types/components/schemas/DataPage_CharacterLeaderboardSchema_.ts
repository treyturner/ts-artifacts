import type { CharacterLeaderboardSchema } from "./CharacterLeaderboardSchema.js";

export type DataPage_CharacterLeaderboardSchema_ = {
  data: Array<CharacterLeaderboardSchema>;
  total: number | null;
  page: number | null;
  size: number | null;
  pages?: number | null;
};
