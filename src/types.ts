import type { components, paths } from "../lib/api.generated";

/** Re-export openapi-typescript generated types for convenience */

// entrypoints
export type Paths = paths;
export type Schemas = components["schemas"];

// request types
export type CraftReq = Schemas["CraftingSchema"];
export type DeleteReq = Schemas["SimpleItemSchema"];
export type EquipReq = Schemas["EquipSchema"];
export type GoldReq = Schemas["DepositWithdrawGoldSchema"];
export type MoveReq = Schemas["DestinationSchema"];
export type UnequipReq = Schemas["UnequipSchema"];

// response types
export type BankItem = Schemas["BankItemSchema"];
export type Character = Schemas["CharacterSchema"];
export type CharacterFightData = Schemas["CharacterFightDataSchema"];
export type CharacterMovementData = Schemas["CharacterMovementDataSchema"];
export type Cooldown = Schemas["CooldownSchema"];
export type DeleteItem = Schemas["DeleteItemSchema"];
export type Equip = Schemas["EquipRequestSchema"];
export type Fight = Schemas["FightSchema"];
export type GoldTransaction = Schemas["GoldTransactionSchema"];
export type GrandExchangeTxnItem = Schemas["GETransactionItemSchema"];
export type GrandExchangeTxnList = Schemas["GETransactionListSchema"];
export type InventorySlot = Schemas["InventorySlot"];
export type Item = Schemas["ItemSchema"];
export type ItemEffect = Schemas["ItemEffectSchema"];
export type Map = Schemas["MapSchema"];
export type MapContent = Schemas["MapContentSchema"];
export type SimpleItem = Schemas["SimpleItemSchema"];
export type SingleItem = Schemas["SingleItemSchema"];
export type SkillData = Schemas["SkillDataSchema"];
export type SkillInfo = Schemas["SkillInfoSchema"];
export type TaskData = Schemas["TaskDataSchema"];
export type TaskRewardData = Schemas["TaskRewardDataSchema"];

// interesting child types
export type Craft = Schemas["CraftSchema"];
export type CraftSkill = NonNullable<Craft["skill"]>;
export type EquipSlot = EquipReq["slot"];

// meta
export type ServerStatus = Schemas["StatusSchema"];

/** custom types (not in spec) */

/** used for image url generation */
export type ImageType = "character" | "effect" | "item" | "map" | "monster" | "resource";
