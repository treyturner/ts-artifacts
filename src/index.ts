import { accountBank } from "./account/bank-account";
import { account } from "./account/game-account";
import { bankActions } from "./actions/bank";
import { craftActions } from "./actions/craft";
import { exchangeActions } from "./actions/exchange";
import { fightActions } from "./actions/fight";
import { gatherActions } from "./actions/gather";
import { itemActions } from "./actions/items";
import { moveActions } from "./actions/move";
import { taskActions } from "./actions/tasks";
import { type Config, type Preferences, getConfig } from "./config";
import { exchangeInfo } from "./info/exchange-info";
import { itemsInfo } from "./info/items-info";
import { mapsInfo } from "./info/maps";
import { meta } from "./info/meta";
import { monstersInfo } from "./info/monsters";
import { resourcesInfo } from "./info/resources";

export type HasClient = {
  client: ArtifactsApi;
};

export class ArtifactsApi {
  config: Config;

  account;
  bank;
  craft;
  exchange;
  fight;
  gather;
  info;
  items;
  move;
  tasks;

  constructor(opts?: Omit<Partial<Config>, "prefs"> & { prefs?: Partial<Preferences> }) {
    this.config = getConfig(opts);
    this.account = { client: this, ...account, bank: { client: this, ...accountBank } };
    this.bank = { client: this, ...bankActions };
    this.craft = { client: this, ...craftActions };
    this.exchange = { client: this, ...exchangeActions };
    this.fight = { client: this, ...fightActions };
    this.gather = { client: this, ...gatherActions };
    this.info = {
      client: this,
      ...meta,
      exchange: { client: this, ...exchangeInfo },
      items: { client: this, ...itemsInfo },
      maps: { client: this, ...mapsInfo },
      monsters: { client: this, ...monstersInfo },
      resources: { client: this, ...resourcesInfo },
    };
    this.items = { client: this, ...itemActions };
    this.move = { client: this, ...moveActions };
    this.tasks = { client: this, ...taskActions };
  }
}
