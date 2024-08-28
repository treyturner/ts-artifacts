import "dotenv";

const { env } = process;

if (!env.API_TOKEN && (!env.USERNAME || !env.PASSWORD))
  throw new Error("API_TOKEN or (USERNAME and PASSWORD) environment variables are required");

if (!env.CHARACTER) throw new Error("CHARACTER environment variable is required.");

const affirmative = ["1", "TRUE", "ON", "YES"];

export const config = {
  apiHost: env.API_HOST ?? "https://api.artifactsmmo.com",
  apiToken: env.API_TOKEN,
  username: env.USERNAME,
  password: env.PASSWORD,
  name: env.CHARACTER,
  logHttpRequests: affirmative.includes(env.LOG_HTTP_REQUESTS?.toUpperCase() ?? ""),
  logHttpResponses: affirmative.includes(env.LOG_HTTP_RESPONSES?.toUpperCase() ?? ""),
  hideCharacterInResponseLog: affirmative.includes(env.HIDE_CHARACTER_IN_RESPONSE?.toUpperCase() ?? ""),
  hideCooldownInResponseLog: affirmative.includes(env.HIDE_COOLDOWN_IN_RESPONSE?.toUpperCase() ?? ""),
};
