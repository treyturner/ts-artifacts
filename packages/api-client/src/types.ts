import { ArtifactsApi } from ".";
import type { components, operations } from "./lib/api.generated";

/** Collect, organize, & re-export openapi-typescript generated types for convenience */

// request types
export type AchievementReq = operations["get_achievement_achievements__code__get"]["parameters"]["path"];
export type AddAccountReq = components["schemas"]["AddAccountSchema"];
export type AddCharacterReq = components["schemas"]["AddCharacterSchema"];
export type ChangePasswordReq = components["schemas"]["ChangePassword"];
export type CharacterAchievementsReq =
  operations["get_character_achievements_characters__name__achievements_get"]["parameters"]["query"];
export type CharacterReq = operations["get_character_characters__name__get"]["parameters"]["path"];
export type CraftReq = components["schemas"]["CraftingSchema"];
export type DeleteReq = components["schemas"]["SimpleItemSchema"];
export type DeleteCharacterReq = components["schemas"]["DeleteCharacterSchema"];
// Generated EquipReq type doesn't set quantity as optional?
export type EquipReq = Omit<components["schemas"]["EquipSchema"], "quantity"> &
  Partial<components["schemas"]["EquipSchema"]>;
export type GEItemReq = operations["get_ge_item_ge__code__get"]["parameters"]["path"];
export type GoldReq = components["schemas"]["DepositWithdrawGoldSchema"];
export type ItemReq = operations["get_item_items__code__get"]["parameters"]["path"];
export type LeaderboardReq = operations["get_leaderboard_leaderboard_get"]["parameters"]["query"];
export type MapReq = operations["get_map_maps__x___y__get"]["parameters"]["path"];
export type MonsterReq = operations["get_monster_monsters__code__get"]["parameters"]["path"];
export type MoveReq = components["schemas"]["DestinationSchema"];
export type TaskReq = operations["get_task_tasks_list__code__get"]["parameters"]["path"];
export type TasksRewardReq = operations["get_tasks_reward_tasks_rewards__code__get"]["parameters"]["path"];
export type RecycleReq = components["schemas"]["RecyclingSchema"];
export type ResourceReq = operations["get_resource_resources__code__get"]["parameters"]["path"];
// Generated UnequipReq type doesn't set quantity as optional?
export type UnequipReq = Omit<components["schemas"]["UnequipSchema"], "quantity"> &
  Partial<components["schemas"]["UnequipSchema"]>;

// response types
export type Achievement = components["schemas"]["AchievementSchema"];
export type ActiveEvent = components["schemas"]["ActiveEventSchema"];
export type ApiResponse = components["schemas"]["ResponseSchema"];
export type Bank = components["schemas"]["BankSchema"];
export type BankItem = components["schemas"]["BankItemTransactionSchema"];
export type BankExtensionTransaction = components["schemas"]["BankExtensionTransactionSchema"];
export type BaseAchievement = components["schemas"]["BaseAchievementSchema"];
export type Character = components["schemas"]["CharacterSchema"];
export type CharacterFightData = components["schemas"]["CharacterFightDataSchema"];
export type CharacterLeaderboard = components["schemas"]["CharacterLeaderboardSchema"];
export type CharacterMovementData = components["schemas"]["CharacterMovementDataSchema"];
export type Cooldown = components["schemas"]["CooldownSchema"];
export type DeleteItem = components["schemas"]["DeleteItemSchema"];
export type Equip = components["schemas"]["EquipRequestSchema"];
export type Fight = components["schemas"]["FightSchema"];
export type Gold = components["schemas"]["GoldSchema"];
export type GoldTransaction = components["schemas"]["BankGoldTransactionSchema"];
export type GEItem = components["schemas"]["GEItemSchema"];
export type GETransactionItem = components["schemas"]["GETransactionItemSchema"];
export type GETransactionList = components["schemas"]["GETransactionListSchema"];
export type InventorySlot = components["schemas"]["InventorySlot"];
export type Item = components["schemas"]["ItemSchema"];
export type ItemEffect = components["schemas"]["ItemEffectSchema"];
export type Log = components["schemas"]["LogSchema"];
export type Mapp = components["schemas"]["MapSchema"];
export type Monster = components["schemas"]["MonsterSchema"];
export type RecyclingData = components["schemas"]["RecyclingDataSchema"];
export type RecyclingItems = components["schemas"]["RecyclingItemsSchema"];
export type Resource = components["schemas"]["ResourceSchema"];
export type SimpleItem = components["schemas"]["SimpleItemSchema"];
export type SingleItem = components["schemas"]["SingleItemSchema"];
export type SkillData = components["schemas"]["SkillDataSchema"];
export type SkillInfo = components["schemas"]["SkillInfoSchema"];
export type Task = components["schemas"]["TaskSchema"];
export type TaskData = components["schemas"]["TaskDataSchema"];
export type TaskFull = components["schemas"]["TaskFullSchema"];
export type TaskTrade = components["schemas"]["TaskTradeSchema"];
export type TaskTradeData = components["schemas"]["TaskTradeDataSchema"];
export type TasksReward = components["schemas"]["TasksRewardSchema"];
export type TasksRewardData = components["schemas"]["TasksRewardDataSchema"];
export type TasksRewardFull = components["schemas"]["TasksRewardFullSchema"];
export type TaskCancelled = components["schemas"]["TaskCancelledSchema"];
export type TokenResponse = components["schemas"]["TokenResponseSchema"];

// top-level types found nested within response types
export type Craft = components["schemas"]["CraftSchema"];
export type Drop = components["schemas"]["DropSchema"];
export type MapContent = components["schemas"]["MapContentSchema"];

// data page request types
export type AchievementsReq = operations["get_all_achievements_achievements_get"]["parameters"]["query"];
export type BankItemsReq = operations["get_bank_items_my_bank_items_get"]["parameters"]["query"];
export type GEItemsReq = operations["get_all_ge_items_ge_get"]["parameters"]["query"];
export type ItemsReq = operations["get_all_items_items_get"]["parameters"]["query"];
export type MapsReq = operations["get_all_maps_maps_get"]["parameters"]["query"];
export type MonstersReq = operations["get_all_monsters_monsters_get"]["parameters"]["query"];
export type ResourcesReq = operations["get_all_resources_resources_get"]["parameters"]["query"];
export type TasksReq = operations["get_all_tasks_tasks_list_get"]["parameters"]["query"];
export type TasksRewardsReq = operations["get_all_tasks_rewards_tasks_rewards_get"]["parameters"]["query"];

// interesting enums
export type CooldownReason = Cooldown["reason"];
export type CraftSkill = NonNullable<Craft["skill"]>;
export type EquipSlot = EquipReq["slot"];
export type MapContentType = Pick<NonNullable<MapsReq>, "content_type">["content_type"];

// meta
export type ServerStatus = components["schemas"]["StatusSchema"];

/**
 * custom types (not derived from openapi spec)
 **/
export { ArtifactsApi };
export type State = {
  party: Character[];
  bank: Partial<Bank> & { items: SimpleItem[] };
  game: {
    achievements: BaseAchievement[];
    items: Item[];
    maps: Mapp[];
    monsters: Monster[];
    resources: Resource[];
    tasks: TaskFull[];
    taskRewards: TasksRewardFull[];
  };
  world: {
    characters: Character[];
    events: ActiveEvent[];
    exchange: GEItem[];
    leaderboard: CharacterLeaderboard[];
    serverStatus: RequireArraysOthersPartial<ServerStatus>;
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
export type BankItems = Omit<components["schemas"]["BankItemTransactionSchema"], "item"> & { items: Item[] };

/** Utility types */
export type RecursivePartial<T> = { [P in keyof T]?: RecursivePartial<T[P]> };
// biome-ignore lint/suspicious/noExplicitAny: array check
export type ArrayKeys<T> = { [K in keyof T]: Array<any> extends T[K] ? K : never }[keyof T];
export type RequireArrays<T extends object> = T & Pick<Required<T>, ArrayKeys<T>>;
export type RequireArraysOthersPartial<T extends object> = Partial<T> & Pick<Required<T>, ArrayKeys<T>>;

// greasy hack to enforce non-negative integer less than supplied value
// WARNING: only good up to 768 or so, ymmv
export type Length<T extends unknown[]> = T extends { length: infer L } ? L : never;
export type LessThan<L extends number, T extends unknown[] = [], O = 0> = T extends { length: L }
  ? O
  : LessThan<L, [...T, unknown], O | Length<T>>;
