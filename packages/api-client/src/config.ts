import "dotenv";
import type { Config, Preferences, RecursivePartial } from "./types";
import { getCallerName, log, pp } from "./util";

const { env } = process;

function meetsConfigMinimum(proposed?: Partial<Config>): proposed is Config {
  if (!proposed) {
    log(getCallerName(), "Config is undefined. Set environment variables or pass constructor arguments", {
      logFn: console.error,
    });
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
    apiHost: env.ARTIFACTS_API_BASEURL ?? "https://api.artifactsmmo.com",
    apiToken: env.ARTIFACTS_API_TOKEN,
    username: env.ARTIFACTS_USERNAME,
    password: env.ARTIFACTS_PASSWORD,
    character: env.ARTIFACTS_CHARACTER,
    prefs: {
      logHttpRequests: affirmative.includes(env.ARTIFACTS_LOG_HTTP_REQUESTS?.toUpperCase() ?? "1"),
      logHttpResponses: affirmative.includes(env.ARTIFACTS_LOG_HTTP_RESPONSES?.toUpperCase() ?? "1"),
      hideCharacterInResponseLog: !negative.includes(env.ARTIFACTS_HIDE_CHARACTER_IN_RESPONSE?.toUpperCase() ?? "1"),
      hideCooldownInResponseLog: !negative.includes(env.ARTIFACTS_HIDE_COOLDOWN_IN_RESPONSE?.toUpperCase() ?? "1"),
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
