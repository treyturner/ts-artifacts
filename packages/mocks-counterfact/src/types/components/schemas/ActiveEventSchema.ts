import type { MapSchema } from "./MapSchema.js";

export type ActiveEventSchema = {
  name: string;
  map: MapSchema;
  previous_skin: string;
  duration: number;
  expiration: string;
  created_at: string;
};
