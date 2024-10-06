import type { CharacterSchema } from "./CharacterSchema.js";

export type DataPage_CharacterSchema_ = {
  data: Array<CharacterSchema>;
  total: number | null;
  page: number | null;
  size: number | null;
  pages?: number | null;
};
