export type TaskFullSchema = {
  code: string;
  level: number;
  type: "monsters" | "items";
  min_quantity: number;
  max_quantity: number;
  skill: string | null;
};
