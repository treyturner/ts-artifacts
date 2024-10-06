export type UnequipSchema = {
  slot:
    | "weapon"
    | "shield"
    | "helmet"
    | "body_armor"
    | "leg_armor"
    | "boots"
    | "ring1"
    | "ring2"
    | "amulet"
    | "artifact1"
    | "artifact2"
    | "artifact3"
    | "consumable1"
    | "consumable2";
  quantity?: number;
};
