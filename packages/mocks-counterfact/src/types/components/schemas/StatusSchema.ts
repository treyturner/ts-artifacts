import type { AnnouncementSchema } from "./AnnouncementSchema.js";

export type StatusSchema = {
  status: string;
  version?: string;
  max_level: number;
  characters_online: number;
  server_time: string;
  announcements: Array<AnnouncementSchema>;
  last_wipe: string;
  next_wipe: string;
};
