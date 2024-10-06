import type { HTTP_POST } from "../../../../../types/paths/my/{name}/action/bank/deposit.types.js";

export const POST: HTTP_POST = ($) => {
  return $.response[200].random();
};
