import type { components as Components, operations as Operations } from "../lib/api.generated";

/** Re-export openapi-typescript generated types for convenience */

// entrypoints
export type {
  components as Components,
  operations as Operations,
  paths as Paths,
} from "../lib/api.generated";
export type Schemas = Components["schemas"];

// request types
export type CraftReq = Schemas["CraftingSchema"];
export type DeleteReq = Schemas["SimpleItemSchema"];
export type EquipReq = Schemas["EquipSchema"];
export type GoldReq = Schemas["DepositWithdrawGoldSchema"];
export type ItemReq = Operations["get_item_items__code__get"]["parameters"]["path"];
export type MapReq = Operations["get_map_maps__x___y__get"]["parameters"]["path"];
export type MonsterReq = Operations["get_monster_monsters__code__get"]["parameters"]["path"];
export type MoveReq = Schemas["DestinationSchema"];
export type ResourceReq = Operations["get_resource_resources__code__get"]["parameters"]["path"];
export type UnequipReq = Schemas["UnequipSchema"];

// response types
export type ActiveEvent = Schemas["ActiveEventSchema"];
export type BankItem = Schemas["BankItemSchema"];
export type Character = Schemas["CharacterSchema"];
export type CharacterFightData = Schemas["CharacterFightDataSchema"];
export type CharacterMovementData = Schemas["CharacterMovementDataSchema"];
export type Cooldown = Schemas["CooldownSchema"];
export type DeleteItem = Schemas["DeleteItemSchema"];
export type Equip = Schemas["EquipRequestSchema"];
export type Fight = Schemas["FightSchema"];
export type GoldTransaction = Schemas["GoldTransactionSchema"];
export type GrandExchangeItem = Schemas["GEItemSchema"];
export type GrandExchangeTxnItem = Schemas["GETransactionItemSchema"];
export type GrandExchangeTxnList = Schemas["GETransactionListSchema"];
export type InventorySlot = Schemas["InventorySlot"];
export type Item = Schemas["ItemSchema"];
export type ItemEffect = Schemas["ItemEffectSchema"];
export type Log = Schemas["LogSchema"];
export type Mapp = Schemas["MapSchema"];
export type Monster = Schemas["MonsterSchema"];
export type Resource = Schemas["ResourceSchema"];
export type SimpleItem = Schemas["SimpleItemSchema"];
export type SingleItem = Schemas["SingleItemSchema"];
export type SkillData = Schemas["SkillDataSchema"];
export type SkillInfo = Schemas["SkillInfoSchema"];
export type TaskData = Schemas["TaskDataSchema"];
export type TaskRewardData = Schemas["TaskRewardDataSchema"];

// data page request types
export type ItemsReq = Operations["get_all_items_items__get"]["parameters"]["query"];
export type MapsReq = Operations["get_all_maps_maps__get"]["parameters"]["query"];
export type MonstersReq = Operations["get_all_monsters_monsters__get"]["parameters"]["query"];
export type ResourcesReq = Operations["get_all_resources_resources__get"]["parameters"]["query"];

// interesting child types
export type Craft = Schemas["CraftSchema"];
export type CraftSkill = NonNullable<Craft["skill"]>;
export type EquipSlot = EquipReq["slot"];
export type MapContent = Schemas["MapContentSchema"];

// meta
export type ServerStatus = Schemas["StatusSchema"];

/**
 * custom types (not in spec)
 **/

/** used for image url generation */
export type ImageType = "character" | "effect" | "item" | "map" | "monster" | "resource";

/** data page types */
export type DataPageReq = { page?: number; size?: number };
export type DataPage<
  T = ActiveEvent | Character | GrandExchangeItem | Item | Log | Mapp | Monster | Resource | SimpleItem,
> = {
  data: T[];
  total: number | null;
  page: number | null;
  size: number | null;
  pages?: number | null;
};
