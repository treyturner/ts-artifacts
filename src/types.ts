export type Slot =
  | "amulet"
  | "artifact1"
  | "artifact2"
  | "artifact3"
  | "body_armor"
  | "boots"
  | "consumable1"
  | "consumable2"
  | "helmet"
  | "leg_armor"
  | "ring1"
  | "ring2"
  | "shield"
  | "weapon";

export type Cooldown = {
  total_seconds: number;
  remaining_seconds: number;
  started_at: string;
  expiration: string;
  reason: string;
};

export type Destination = {
  name: string;
  skin: string;
  x: number;
  y: number;
  content: { type: string; code: string };
};

export type Character = {
  name: string;
  skin: string;
  level: number;
  xp: number;
  max_xp: number;
  total_xp: number;
  gold: number;
  speed: number;
  mining_level: number;
  mining_xp: number;
  mining_max_xp: number;
  woodcutting_level: number;
  woodcutting_xp: number;
  woodcutting_max_xp: number;
  fishing_level: number;
  fishing_xp: number;
  fishing_max_xp: number;
  weaponcrafting_level: number;
  weaponcrafting_xp: number;
  weaponcrafting_max_xp: number;
  gearcrafting_level: number;
  gearcrafting_xp: number;
  gearcrafting_max_xp: number;
  jewelrycrafting_level: number;
  jewelrycrafting_xp: number;
  jewelrycrafting_max_xp: number;
  cooking_level: number;
  cooking_xp: number;
  cooking_max_xp: number;
  hp: number;
  haste: number;
  critical_strike: number;
  stamina: number;
  attack_fire: number;
  attack_earth: number;
  attack_water: number;
  attack_air: number;
  dmg_fire: number;
  dmg_earth: number;
  dmg_water: number;
  dmg_air: number;
  res_fire: number;
  res_earth: number;
  res_water: number;
  res_air: number;
  x: number;
  y: number;
  cooldown: number;
  cooldown_expiration: string;
  weapon_slot: string;
  shield_slot: string;
  helmet_slot: string;
  body_armor_slot: string;
  leg_armor_slot: string;
  boots_slot: string;
  ring1_slot: string;
  ring2_slot: string;
  amulet_slot: string;
  artifact1_slot: string;
  artifact2_slot: string;
  artifact3_slot: string;
  consumable1_slot: string;
  consumable1_slot_quantity: number;
  consumable2_slot: string;
  consumable2_slot_quantity: number;
  task: string;
  task_type: string;
  task_progress: number;
  task_total: number;
  inventory_max_items: number;
  inventory: { slot: number; code: string; quantity: 4 }[];
};
