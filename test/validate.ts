import { expect } from "bun:test";

export const validateAnnouncement = (ann: unknown) => {
  expect(ann).toBeObject();
  expect(ann).toHaveProperty("message");
  expect(ann).toHaveProperty("created_at");
  const a = ann as { message: unknown; created_at: unknown };
  expect(a.message).toBeString();
  expect(a.created_at).toBeString();
};

export const validateBankDetails = (data: unknown) => {
  expect(data).toBeObject();
  const props = <const>["slots", "expansions", "next_expansion_cost", "gold"];
  type Props = (typeof props)[number];
  for (const prop of props) expect(data).toHaveProperty(prop);
  const bank = data as Record<Props, unknown>;
  expect(bank.slots).toBeNumber();
  expect(bank.expansions).toBeNumber();
  expect(bank.next_expansion_cost).toBeNumber();
  expect(bank.gold).toBeNumber();
};

export const validateBankItems = (data: unknown) => {
  expect(data).toBeArray();
  const bankItems = data as unknown[];
  if (bankItems.length > 0) {
    const item = bankItems.pop();
    validateSimpleItem(item);
  }
};

export const validateEvent = (data: unknown) => {
  expect(data).toBeObject();
  const props = <const>["map", "previous_skin", "duration", "expiration", "created_at"];
  type Props = (typeof props)[number];
  for (const prop of props) expect(data).toHaveProperty(prop);
  const event = data as Record<Props, unknown>;
  expect(event.previous_skin).toBeString();
  expect(event.duration).toBeNumber();
  expect(event.expiration).toBeString();
  expect(event.created_at).toBeString();
  expect(event.map).toBeObject();
  validateMap(event.map);
};

export const validateGeItem = (data: unknown) => {
  expect(data).toBeObject();
  const props = <const>["code", "stock", "sell_price", "buy_price", "max_quantity"];
  type Props = (typeof props)[number];
  for (const prop of props) expect(data).toHaveProperty(prop);
  const item = data as Record<Props, unknown>;
  expect(item.code).toBeString();
  expect(item.stock).toBeNumber();
  expect(item.sell_price).toBeNumber();
  expect(item.buy_price).toBeNumber();
  expect(item.max_quantity).toBeNumber();
};

export const validateItem = (data: unknown) => {
  expect(data).toBeObject();
  const props = <const>["name", "code", "level", "type", "subtype", "description", "effects"];
  type Props = (typeof props)[number];
  for (const prop of props) expect(data).toHaveProperty(prop);
  const item = data as Record<Props, unknown>;
  expect(item.name).toBeString();
  expect(item.code).toBeString();
  expect(item.level).toBeNumber();
  expect(item.type).toBeString();
  expect(item.subtype).toBeString();
  expect(item.description).toBeString();
  expect(item.effects).toBeArray();
};

export const validateLeaderboardEntry = (data: unknown) => {
  expect(data).toBeObject();
  const props = <const>[
    "name",
    "skin",
    "achievements_points",
    "level",
    "total_xp",
    "mining_level",
    "mining_total_xp",
    "woodcutting_level",
    "woodcutting_total_xp",
    "fishing_level",
    "fishing_total_xp",
    "weaponcrafting_level",
    "weaponcrafting_total_xp",
    "gearcrafting_level",
    "gearcrafting_total_xp",
    "jewelrycrafting_level",
    "jewelrycrafting_total_xp",
    "cooking_level",
    "cooking_total_xp",
    "gold",
  ];
  type Props = (typeof props)[number];
  for (const prop of props) expect(data).toHaveProperty(prop);
  const entry = data as Record<Props, unknown>;
  expect(entry.name).toBeString();
  expect(entry.skin).toBeString();
  expect(entry.achievements_points).toBeNumber();
  expect(entry.level).toBeNumber();
  expect(entry.total_xp).toBeNumber();
  expect(entry.mining_level).toBeNumber();
  expect(entry.mining_total_xp).toBeNumber();
  expect(entry.woodcutting_level).toBeNumber();
  expect(entry.woodcutting_total_xp).toBeNumber();
  expect(entry.fishing_level).toBeNumber();
  expect(entry.fishing_total_xp).toBeNumber();
  expect(entry.weaponcrafting_level).toBeNumber();
  expect(entry.weaponcrafting_total_xp).toBeNumber();
  expect(entry.gearcrafting_level).toBeNumber();
  expect(entry.gearcrafting_total_xp).toBeNumber();
  expect(entry.jewelrycrafting_level).toBeNumber();
  expect(entry.jewelrycrafting_total_xp).toBeNumber();
  expect(entry.cooking_level).toBeNumber();
  expect(entry.cooking_total_xp).toBeNumber();
  expect(entry.gold).toBeNumber();
};

export const validateMap = (data: unknown) => {
  expect(data).toBeObject();
  const props = <const>["name", "skin", "x", "y", "content"];
  type Props = (typeof props)[number];
  for (const prop of props) expect(data).toHaveProperty(prop);
  const map = data as Record<Props, unknown>;
  expect(map.name).toBeString();
  expect(map.skin).toBeString();
  expect(map.x).toBeNumber();
  expect(map.y).toBeNumber();
  if (map.content !== null) {
    validateMapContent(map.content);
  }
};

export const validateMapContent = (data: unknown) => {
  expect(data).toBeObject();
  const props = <const>["type", "code"];
  type Props = (typeof props)[number];
  for (const prop of props) expect(data).toHaveProperty(prop);
  const content = data as Record<Props, unknown>;
  expect(content.type).toBeString();
  expect(content.code).toBeString();
};

export const validateServerStatus = (data: unknown) => {
  expect(data).toBeObject();
  const props = <const>[
    "status",
    "version",
    "max_level",
    "characters_online",
    "server_time",
    "announcements",
    "last_wipe",
    "next_wipe",
  ];
  type Props = (typeof props)[number];
  for (const prop of props) expect(data).toHaveProperty(prop);
  const serverStatus = data as Record<Props, unknown>;
  expect(serverStatus.status).toBeString();
  expect(serverStatus.status).toBe("online");
  if (typeof serverStatus.version !== "undefined") expect(serverStatus.version).toBeString();
  expect(serverStatus.max_level).toBeNumber();
  expect(serverStatus.characters_online).toBeNumber();
  expect(serverStatus.server_time).toBeString();
  expect(serverStatus.announcements).toBeArray();
  for (const ann of serverStatus.announcements as unknown[]) validateAnnouncement(ann);
  expect(serverStatus.last_wipe).toBeString();
  expect(serverStatus.next_wipe).toBeString();
};

export const validateSimpleItem = (data: unknown) => {
  expect(data).toBeObject();
  const props = <const>["code", "quantity"];
  type Props = (typeof props)[number];
  for (const prop of props) expect(data).toHaveProperty(prop);
  const item = data as Record<Props, unknown>;
  expect(item.code).toBeString();
  expect(item.quantity).toBeNumber();
};

export const validate = {
  announcement: validateAnnouncement,
  bankDetails: validateBankDetails,
  bankItems: validateBankItems,
  event: validateEvent,
  geItem: validateGeItem,
  item: validateItem,
  leaderboardEntry: validateLeaderboardEntry,
  map: validateMap,
  mapContent: validateMapContent,
  serverStatus: validateServerStatus,
  simpleItem: validateSimpleItem,
};
