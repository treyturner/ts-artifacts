import { expect } from "bun:test";

export const validateMap = (data: unknown) => {
  expect(data).toBeObject();
  // biome-ignore lint/suspicious/noExplicitAny: type assert
  const map = data as any;
  expect(map.name).toBeString();
  expect(map.skin).toBeString();
  expect(map.x).toBeNumber();
  expect(map.y).toBeNumber();
  if (map.content !== null) {
    expect(map.content).toBeObject();
    expect(map.content.type).toBeString();
    expect(map.content.code).toBeString();
  } else {
    expect(map.content).toBeNull();
  }
};

export const validateBank = (data: unknown) => {
  expect(data).toBeObject();
  // biome-ignore lint/suspicious/noExplicitAny: type assert
  const bank = data as any;
  expect(bank.slots).toBeNumber();
  expect(bank.expansions).toBeNumber();
  expect(bank.next_expansion_cost).toBeNumber();
  expect(bank.gold).toBeNumber();
};

export const validateItem = (data: unknown) => {
  expect(data).toBeObject();
  // biome-ignore lint/suspicious/noExplicitAny: type assert
  const item = data as any;
  expect(item.name).toBeString();
  expect(item.code).toBeString();
  expect(item.level).toBeNumber();
  expect(item.type).toBeString();
  expect(item.subtype).toBeString();
  expect(item.description).toBeString();
  expect(item.effects).toBeArray();
};

export const validateLeaderboardEntry = (le: unknown) => {
  expect(le).toBeObject();
  // biome-ignore lint/suspicious/noExplicitAny: type assert
  const e = le as any;
  expect(e.name).toBeString();
  expect(e.skin).toBeString();
  expect(e.achievements_points).toBeNumber();
  expect(e.level).toBeNumber();
  expect(e.total_xp).toBeNumber();
  expect(e.mining_level).toBeNumber();
  expect(e.mining_total_xp).toBeNumber();
  expect(e.woodcutting_level).toBeNumber();
  expect(e.woodcutting_total_xp).toBeNumber();
  expect(e.fishing_level).toBeNumber();
  expect(e.fishing_total_xp).toBeNumber();
  expect(e.weaponcrafting_level).toBeNumber();
  expect(e.weaponcrafting_total_xp).toBeNumber();
  expect(e.gearcrafting_level).toBeNumber();
  expect(e.gearcrafting_total_xp).toBeNumber();
  expect(e.jewelrycrafting_level).toBeNumber();
  expect(e.jewelrycrafting_total_xp).toBeNumber();
  expect(e.cooking_level).toBeNumber();
  expect(e.cooking_total_xp).toBeNumber();
  expect(e.gold).toBeNumber();
};

export const validateEvent = (event: unknown) => {
  expect(event).toBeObject();
  // biome-ignore lint/suspicious/noExplicitAny: type assert
  const e = event as any;
  expect(e.map).toBeObject();
  expect(e.map.name).toBeString();
  expect(e.map.skin).toBeString();
  expect(e.map.x).toBeNumber();
  expect(e.map.y).toBeNumber();
  expect(e.previous_skin).toBeString();
  expect(e.duration).toBeNumber();
  expect(e.expiration).toBeString();
  expect(e.created_at).toBeString();
};

export const validateServerStatus = (data: unknown) => {
  expect(data).toBeObject();
  // biome-ignore lint/suspicious/noExplicitAny: type assert
  const serverStatus = data as any;
  expect(serverStatus.status).toBeString();
  expect(serverStatus.status).toBe("online");
  if (typeof serverStatus.version !== "undefined") expect(serverStatus.version).toBeString();
  expect(serverStatus.max_level).toBeNumber();
  expect(serverStatus.characters_online).toBeNumber();
  expect(serverStatus.server_time).toBeString();
  expect(serverStatus.announcements).toBeArray();
  for (const ann of serverStatus.announcements) validateAnnouncement(ann);
  expect(serverStatus.last_wipe).toBeString();
  expect(serverStatus.next_wipe).toBeString();
};

export const validateAnnouncement = (ann: unknown) => {
  expect(ann).toBeObject();
  // biome-ignore lint/suspicious/noExplicitAny: type assert
  const a = ann as any;
  expect(a.message).toBeString();
  expect(a.created_at).toBeString();
};

export const validate = {
  announcement: validateAnnouncement,
  bank: validateBank,
  event: validateEvent,
  item: validateItem,
  leaderboardEntry: validateLeaderboardEntry,
  map: validateMap,
  serverStatus: validateServerStatus,
};
