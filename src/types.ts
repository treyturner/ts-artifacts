import type { ArtifactsApi } from ".";
import type { components as Components, operations as Operations } from "./lib/api.generated";

/** Collect, organize, & re-export openapi-typescript generated types for convenience */

// entrypoints
export type {
  components as Components,
  operations as Operations,
  paths as Paths,
} from "./lib/api.generated";
export type Schemas = Components["schemas"];

// request types
export type AchievementReq = Operations["get_achievement_achievements__code__get"]["parameters"]["path"];
export type AddAccountReq = Schemas["AddAccountSchema"];
export type AddCharacterReq = Schemas["AddCharacterSchema"];
export type ChangePasswordReq = Schemas["ChangePassword"];
export type CharacterAchievementsReq =
  Operations["get_character_achievements_characters__name__achievements_get"]["parameters"]["query"];
export type CharacterReq = Operations["get_character_characters__name__get"]["parameters"]["path"];
export type CraftReq = Schemas["CraftingSchema"];
export type DeleteReq = Schemas["SimpleItemSchema"];
export type DeleteCharacterReq = Schemas["DeleteCharacterSchema"];
// Generated EquipReq type doesn't set quantity as optional?
export type EquipReq = Omit<Schemas["EquipSchema"], "quantity"> & Partial<Schemas["EquipSchema"]>;
export type GEItemReq = Operations["get_ge_item_ge__code__get"]["parameters"]["path"];
export type GoldReq = Schemas["DepositWithdrawGoldSchema"];
export type ItemReq = Operations["get_item_items__code__get"]["parameters"]["path"];
export type LeaderboardReq = Operations["get_leaderboard_leaderboard_get"]["parameters"]["query"];
export type MapReq = Operations["get_map_maps__x___y__get"]["parameters"]["path"];
export type MonsterReq = Operations["get_monster_monsters__code__get"]["parameters"]["path"];
export type MoveReq = Schemas["DestinationSchema"];
export type TaskReq = Operations["get_task_tasks_list__code__get"]["parameters"]["path"];
export type TasksRewardReq = Operations["get_tasks_reward_tasks_rewards__code__get"]["parameters"]["path"];
export type RecycleReq = Schemas["RecyclingSchema"];
export type ResourceReq = Operations["get_resource_resources__code__get"]["parameters"]["path"];
// Generated UnequipReq type doesn't set quantity as optional?
export type UnequipReq = Omit<Schemas["UnequipSchema"], "quantity"> & Partial<Schemas["UnequipSchema"]>;

// response types
export type Achievement = Schemas["AchievementSchema"];
export type ActiveEvent = Schemas["ActiveEventSchema"];
export type ApiResponse = Schemas["ResponseSchema"];
export type Bank = Schemas["BankSchema"];
export type BankItem = Schemas["BankItemTransactionSchema"];
export type BankExtensionTransaction = Schemas["BankExtensionTransactionSchema"];
export type BaseAchievement = Schemas["BaseAchievementSchema"];
export type Character = Schemas["CharacterSchema"];
export type CharacterFightData = Schemas["CharacterFightDataSchema"];
export type CharacterLeaderboard = Schemas["CharacterLeaderboardSchema"];
export type CharacterMovementData = Schemas["CharacterMovementDataSchema"];
export type Cooldown = Schemas["CooldownSchema"];
export type DeleteItem = Schemas["DeleteItemSchema"];
export type Equip = Schemas["EquipRequestSchema"];
export type Fight = Schemas["FightSchema"];
export type Gold = Schemas["GoldSchema"];
export type GoldTransaction = Schemas["BankGoldTransactionSchema"];
export type GEItem = Schemas["GEItemSchema"];
export type GETransactionItem = Schemas["GETransactionItemSchema"];
export type GETransactionList = Schemas["GETransactionListSchema"];
export type InventorySlot = Schemas["InventorySlot"];
export type Item = Schemas["ItemSchema"];
export type ItemEffect = Schemas["ItemEffectSchema"];
export type Log = Schemas["LogSchema"];
export type Mapp = Schemas["MapSchema"];
export type Monster = Schemas["MonsterSchema"];
export type RecyclingData = Schemas["RecyclingDataSchema"];
export type RecyclingItems = Schemas["RecyclingItemsSchema"];
export type Resource = Schemas["ResourceSchema"];
export type SimpleItem = Schemas["SimpleItemSchema"];
export type SingleItem = Schemas["SingleItemSchema"];
export type SkillData = Schemas["SkillDataSchema"];
export type SkillInfo = Schemas["SkillInfoSchema"];
export type Task = Schemas["TaskSchema"];
export type TaskData = Schemas["TaskDataSchema"];
export type TaskFull = Schemas["TaskFullSchema"];
export type TaskTrade = Schemas["TaskTradeSchema"];
export type TaskTradeData = Schemas["TaskTradeDataSchema"];
export type TasksReward = Schemas["TasksRewardSchema"];
export type TasksRewardData = Schemas["TasksRewardDataSchema"];
export type TasksRewardFull = Schemas["TasksRewardFullSchema"];
export type TaskCancelled = Schemas["TaskCancelledSchema"];
export type TokenResponse = Schemas["TokenResponseSchema"];

// top-level types found nested within response types
export type Craft = Schemas["CraftSchema"];
export type Drop = Schemas["DropSchema"];
export type MapContent = Schemas["MapContentSchema"];

// data page request types
export type AchievementsReq = Operations["get_all_achievements_achievements_get"]["parameters"]["query"];
export type BankItemsReq = Operations["get_bank_items_my_bank_items_get"]["parameters"]["query"];
export type GEItemsReq = Operations["get_all_ge_items_ge_get"]["parameters"]["query"];
export type ItemsReq = Operations["get_all_items_items_get"]["parameters"]["query"];
export type MapsReq = Operations["get_all_maps_maps_get"]["parameters"]["query"];
export type MonstersReq = Operations["get_all_monsters_monsters_get"]["parameters"]["query"];
export type ResourcesReq = Operations["get_all_resources_resources_get"]["parameters"]["query"];
export type TasksReq = Operations["get_all_tasks_tasks_list_get"]["parameters"]["query"];
export type TasksRewardsReq = Operations["get_all_tasks_rewards_tasks_rewards_get"]["parameters"]["query"];

// interesting enums
export type CooldownReason = Cooldown["reason"];
export type CraftSkill = NonNullable<Craft["skill"]>;
export type EquipSlot = EquipReq["slot"];
export type MapContentType = Pick<NonNullable<MapsReq>, "content_type">["content_type"];

// meta
export type ServerStatus = Schemas["StatusSchema"];

/**
 * custom types (not derived from openapi spec)
 **/

export type { ArtifactsApi } from ".";
export type State = {
  party: Character[];
  bank: {
    meta: Bank;
    items: BankItems;
  };
};

/** config types */
export type HasClient = { client: ArtifactsApi };
export type HasConfig = { config: Config };
export type Config = {
  apiHost: string;
  username?: string;
  password?: string;
  apiToken?: string;
  character?: string;
  prefs: Preferences;
};
export type Preferences = {
  logHttpRequests: boolean;
  logHttpResponses: boolean;
  hideCharacterInResponseLog: boolean;
  hideCooldownInResponseLog: boolean;
};

/** http types */
type SupportedMethod = "GET" | "POST";
export type HttpHeaders = { [key: string]: string | undefined };
export type CallOptions = {
  client: ArtifactsApi;
  /** Does call require auth? */
  auth: boolean;
  /** API uses only GET and POST */
  method: SupportedMethod;
  /** The tokenized path, ie. `/my/{name}/action/move` */
  path: string;
  // biome-ignore lint/suspicious/noExplicitAny: String() accepts any
  query?: { [key: string]: any };
  headers?: HttpHeaders;
  // biome-ignore lint/suspicious/noExplicitAny: JSON.stringify() accepts any
  body?: any;
  /** not-ok (4xx and 5xx) HTTP status codes which should NOT throw an exception */
  notThrowable?: number[];
  /** HTTP timeout in milliseconds */
  timeout?: number;
};
/** used for image url generation */
export type ImageType = "character" | "effect" | "item" | "map" | "monster" | "resource";

/** handle data page types in abstract via generics */
export type DataPageQuery<T> = Omit<NonNullable<T>, keyof DataPageReq>;
export type DataPageReq = { page?: number; size?: number };
export type DataPage<
  T =
    | Achievement
    | ActiveEvent
    | BaseAchievement
    | Character
    | CharacterLeaderboard
    | GEItem
    | Item
    | Log
    | Mapp
    | Monster
    | Resource
    | SimpleItem
    | TaskFull
    | TasksRewardFull,
> = {
  data: T[];
  total: number | null;
  page: number | null;
  size: number | null;
  pages?: number | null;
};

/** Rolled up result of multiple bank item transactions */
export type BankItems = Omit<Schemas["BankItemTransactionSchema"], "item"> & { items: Item[] };

/** Utility types */
export type RecursivePartial<T> = { [P in keyof T]?: RecursivePartial<T[P]> };
