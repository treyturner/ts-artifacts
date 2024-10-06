import type { MapContentSchema } from "./MapContentSchema.js";

export type MapSchema = {
  name: string;
  skin: string;
  x: number;
  y: number;
  content: MapContentSchema | null;
};
