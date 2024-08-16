import type { components, paths } from "../lib/api.generated";

/** Re-export openapi-typescript generated types for convenience */

// depth 1
export type Paths = paths;
export type Schemas = components["schemas"];

// depth 2
export type Character = Schemas["CharacterSchema"];
export type CharacterMovementData = Schemas["CharacterMovementDataSchema"];
export type Cooldown = Schemas["CooldownSchema"];
export type Craft = Schemas["CraftSchema"];
export type Crafting = Schemas["CraftingSchema"];
export type EquipRequest = Schemas["EquipSchema"];
export type EquipResponse = Schemas["EquipRequestSchema"];
export type InventorySlot = Schemas["InventorySlot"];
export type Item = Schemas["ItemSchema"];
export type ItemEffect = Schemas["ItemEffectSchema"];
export type Map = Schemas["MapSchema"];
export type MapContent = Schemas["MapContentSchema"];
export type SkillData = Schemas["SkillDataSchema"];
export type SkillInfo = Schemas["SkillInfoSchema"];

// depth 3
export type CraftSkill = NonNullable<Craft["skill"]>;
export type EquipSlot = EquipRequest["slot"];
