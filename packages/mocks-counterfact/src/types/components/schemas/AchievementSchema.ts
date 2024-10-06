export type AchievementSchema = {
  name: string;
  code: string;
  description: string;
  points: number;
  type: "combat_kill" | "combat_drop" | "combat_level" | "gathering" | "crafting" | "recycling" | "task" | "other";
  target: string | null;
  total: number;
  current: number;
  completed_at: string | null;
};
