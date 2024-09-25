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
import type { Config, HasClient, Preferences } from "./types";

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
