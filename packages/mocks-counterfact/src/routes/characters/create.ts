import type { HTTP_POST } from "../../types/paths/characters/create.types.js";

export const POST: HTTP_POST = ($) => {
  return $.response[200].random();
};
