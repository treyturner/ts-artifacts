import { accountBank } from "./account/bank-account";
import { characters } from "./account/characters";
import { account } from "./account/game-account";
import { bankActions } from "./actions/bank";
import { craftActions } from "./actions/craft";
import { exchangeActions } from "./actions/exchange";
import { fightActions } from "./actions/fight";
import { gatherActions } from "./actions/gather";
import { itemActions } from "./actions/items";
import { moveActions } from "./actions/move";
import { taskActions } from "./actions/tasks";
import { getConfig } from "./config";
import { achievementsInfo } from "./info/achievements";
import { charactersInfo } from "./info/characters";
import { exchangeItemsInfo } from "./info/exchange-items";
import { itemsInfo } from "./info/items-info";
import { mapsInfo } from "./info/maps";
import { metaInfo } from "./info/meta";
import { monstersInfo } from "./info/monsters";
import { resourcesInfo } from "./info/resources";

export class ArtifactsApi {
  config: Config;

  account: HasClient &
    typeof account & {
      bank: HasClient & typeof accountBank;
      characters: HasClient & typeof characters;
    };
  bank: HasClient & typeof bankActions;
  craft: HasClient & typeof craftActions;
  exchange: HasClient & typeof exchangeActions;
  fight: HasClient & typeof fightActions;
  gather: HasClient & typeof gatherActions;
  info: HasClient & {
    achievements: HasClient & typeof achievementsInfo;
    characters: HasClient & typeof charactersInfo;
    exchangeItems: HasClient & typeof exchangeItemsInfo;
    items: HasClient & typeof itemsInfo;
    maps: HasClient & typeof mapsInfo;
    meta: HasClient & typeof metaInfo;
    monsters: HasClient & typeof monstersInfo;
    resources: HasClient & typeof resourcesInfo;
  };
  items: HasClient & typeof itemActions;
  move: HasClient & typeof moveActions;
  tasks: HasClient & typeof taskActions;

  constructor(opts?: Omit<Partial<Config>, "prefs"> & { prefs?: Partial<Preferences> }) {
    this.config = getConfig(opts);
    this.account = {
      client: this,
      ...account,
      bank: { client: this, ...accountBank },
      characters: { client: this, ...characters },
    };
    this.bank = { client: this, ...bankActions };
    this.craft = { client: this, ...craftActions };
    this.exchange = { client: this, ...exchangeActions };
    this.fight = { client: this, ...fightActions };
    this.gather = { client: this, ...gatherActions };
    this.info = {
      client: this,
      achievements: { client: this, ...achievementsInfo },
      characters: { client: this, ...charactersInfo },
      exchangeItems: { client: this, ...exchangeItemsInfo },
      items: { client: this, ...itemsInfo },
      maps: { client: this, ...mapsInfo },
      meta: { client: this, ...metaInfo },
      monsters: { client: this, ...monstersInfo },
      resources: { client: this, ...resourcesInfo },
    };
    this.items = { client: this, ...itemActions };
    this.move = { client: this, ...moveActions };
    this.tasks = { client: this, ...taskActions };
  }

  async setToken() {
    this.config.apiToken = await this.account.getToken();
  }
}

/** Collect, organize, & re-export openapi-typescript generated types for convenience */

import type { components as Components, operations as Operations } from "./lib/api.generated";

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
export type RecycleReq = Schemas["RecyclingSchema"];
export type ResourceReq = Operations["get_resource_resources__code__get"]["parameters"]["path"];
// Generated UnequipReq type doesn't set quantity as optional?
export type UnequipReq = Omit<Schemas["UnequipSchema"], "quantity"> & Partial<Schemas["UnequipSchema"]>;

// response types
export type Achievement = Schemas["AchievementSchema"];
export type ActiveEvent = Schemas["ActiveEventSchema"];
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
export type Response = Schemas["ResponseSchema"];
export type SimpleItem = Schemas["SimpleItemSchema"];
export type SingleItem = Schemas["SingleItemSchema"];
export type SkillData = Schemas["SkillDataSchema"];
export type SkillInfo = Schemas["SkillInfoSchema"];
export type TaskData = Schemas["TaskDataSchema"];
export type TaskCancelled = Schemas["TaskCancelledSchema"];
export type TaskRewardData = Schemas["TaskRewardDataSchema"];
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
    | SimpleItem,
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
