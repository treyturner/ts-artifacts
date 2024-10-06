export type CooldownSchema = {
  total_seconds: number;
  remaining_seconds: number;
  started_at: string;
  expiration: string;
  reason:
    | "movement"
    | "fight"
    | "crafting"
    | "gathering"
    | "buy_ge"
    | "sell_ge"
    | "delete_item"
    | "deposit_bank"
    | "withdraw_bank"
    | "equip"
    | "unequip"
    | "task"
    | "recycling";
};
