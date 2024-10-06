import type { HTTP_POST } from "../../types/paths/accounts/create.types.js";

export const POST: HTTP_POST = ($) => {
  return $.response[200].random();
};
