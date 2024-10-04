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
import { tasksInfo } from "./info/tasks";
import type { Config, HasClient, Preferences, State } from "./types";

export class ArtifactsApi {
  config: Config;
  state: State;

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
    tasks: HasClient & typeof tasksInfo;
  };
  items: HasClient & typeof itemActions;
  move: HasClient & typeof moveActions;
  tasks: HasClient & typeof taskActions;

  constructor(opts?: Omit<Partial<Config>, "prefs"> & { prefs?: Partial<Preferences> }) {
    this.config = getConfig(opts);
    this.state = initState();
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
      tasks: { client: this, ...tasksInfo },
    };
    this.items = { client: this, ...itemActions };
    this.move = { client: this, ...moveActions };
    this.tasks = { client: this, ...taskActions };
  }

  async setToken() {
    this.config.apiToken = await this.account.getToken();
  }

  async syncGameInfo() {
    this.state.game.achievements = await this.info.achievements.getAll();
    this.state.game.items = await this.info.items.getAll();
    this.state.game.maps = await this.info.maps.getAll();
    this.state.game.monsters = await this.info.monsters.getAll();
    this.state.game.resources = await this.info.resources.getAll();
    this.state.game.taskRewards = await this.info.tasks.getAllRewards();
    this.state.game.tasks = await this.info.tasks.getAll();
  }

  async syncWorldInfo() {
    this.state.world.characters = await this.info.characters.getAll();
    this.state.world.events = await this.info.meta.getEvents();
    this.state.world.exchange = await this.info.exchangeItems.getAll();
    this.state.world.leaderboard = await this.info.meta.getLeaderboard();
    this.state.world.serverStatus = await this.info.meta.getServerStatus();
  }

  async syncAccountInfo() {
    if (this.config.apiToken || (this.config.username && this.config.password)) {
      this.state.party = await this.account.characters.getAll();
      this.state.bank = {
        ...(await this.account.bank.getDetails()),
        ...{ items: await this.account.bank.getItems() },
      };
    }
  }

  async sync() {
    return Promise.all([this.syncGameInfo(), this.syncWorldInfo(), this.syncAccountInfo()]);
  }
}

function initState(): State {
  return {
    party: [],
    bank: {
      items: [],
    },
    game: {
      achievements: [],
      items: [],
      maps: [],
      monsters: [],
      resources: [],
      tasks: [],
      taskRewards: [],
    },
    world: {
      characters: [],
      events: [],
      exchange: [],
      leaderboard: [],
      serverStatus: {
        announcements: [],
      },
    },
  };
}
