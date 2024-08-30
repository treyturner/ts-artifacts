import "dotenv";
import type { RecursivePartial } from "./types";
import { getCallerName, log, pp } from "./util";

const { env } = process;

export type HasConfig = {
  config: Config;
};

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

function meetsConfigMinimum(proposed?: Partial<Config>): proposed is Config {
  if (!proposed) {
    log(getCallerName(), "Config is undefined. Set environment variables or pass constructor arguments", {
      logFn: console.error,
    });
    return false;
  }

  if (!proposed.apiToken && (!proposed.username || !proposed.password)) {
    log(
      getCallerName(),
      "API token (or username and password) are required. Set environment variables or pass constructor arguments",
      { logFn: console.error },
    );
    return false;
  }

  if (!/https?:\/\/.+\..+/.test(proposed.apiHost ?? "")) {
    log(getCallerName(), `Supplied apiHost '${proposed.apiHost}' is invalid`, { logFn: console.error });
    return false;
  }

  return true;
}

export const getConfig = (opts: RecursivePartial<Config> = {}): Config => {
  const affirmative = ["1", "TRUE", "ON", "YES", "OPEN"];
  const negative = ["0", "FALSE", "OFF", "NO", "CLOSE"];

  const defaults: Config = {
    apiHost: "https://api.artifactsmmo.com",
    apiToken: env.API_TOKEN,
    username: env.USERNAME,
    password: env.PASSWORD,
    character: env.CHARACTER,
    prefs: {
      logHttpRequests: affirmative.includes(env.LOG_HTTP_REQUESTS?.toUpperCase() ?? "1"),
      logHttpResponses: affirmative.includes(env.LOG_HTTP_RESPONSES?.toUpperCase() ?? "1"),
      hideCharacterInResponseLog: !negative.includes(env.HIDE_CHARACTER_IN_RESPONSE?.toUpperCase() ?? "1"),
      hideCooldownInResponseLog: !negative.includes(env.HIDE_COOLDOWN_IN_RESPONSE?.toUpperCase() ?? "1"),
    },
  };

  const { prefs: userPrefs, ...userOpts } = opts;

  const prefs: Preferences = {
    logHttpRequests: userPrefs?.logHttpRequests ?? defaults.prefs.logHttpRequests,
    logHttpResponses: userPrefs?.logHttpResponses ?? defaults.prefs.logHttpResponses,
    hideCharacterInResponseLog: userPrefs?.hideCharacterInResponseLog ?? defaults.prefs.hideCharacterInResponseLog,
    hideCooldownInResponseLog: userPrefs?.hideCooldownInResponseLog ?? defaults.prefs.hideCooldownInResponseLog,
  };

  const config: Partial<Config> = { ...defaults, ...userOpts, prefs };
  if (meetsConfigMinimum(config)) return config;
  throw new Error(`Resolved an invalid config: ${pp(config)}`);
};
