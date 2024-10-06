import type { HTTP_POST } from "../../../../types/paths/my/{name}/action/equip.types.js";

export const POST: HTTP_POST = ($) => {
  return $.response[200].random();
};
