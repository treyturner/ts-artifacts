export type LogSchema = {
  character: string;
  account: string;
  type: string;
  description: string;
  content: unknown;
  cooldown: number;
  cooldown_expiration: string | null;
  created_at: string;
};
