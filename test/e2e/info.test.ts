import { beforeEach, describe, expect, it } from "bun:test";
import { ArtifactsApi } from "../../src";

let c: ArtifactsApi;

describe("info calls", () => {
  beforeEach(() => {
    c = new ArtifactsApi({
      prefs: {
        logHttpRequests: false,
        logHttpResponses: false,
      },
    });
  });

  describe("items", () => {
    // biome-ignore lint/suspicious/noExplicitAny: type assert
    function validateItem(item: any) {
      expect(item.name).toBeString();
      expect(item.code).toBeString();
      expect(item.level).toBeNumber();
      expect(item.type).toBeString();
      expect(item.subtype).toBeString();
      expect(item.description).toBeString();
      expect(item.effects).toBeArray();
    }

    describe("get item", () => {
      it("should return data for an item", async () => {
        const item = (await c.info.items.get({ code: "copper_ore" })) as unknown;
        expect(item).toBeDefined();
        expect(item).toBeObject();
        // biome-ignore lint/suspicious/noExplicitAny: type assert
        const itemObj = item as NonNullable<any>;
        expect(itemObj.item).toBeObject();
        expect(itemObj.ge).toBeObject();
        validateItem(itemObj.item);
      });
    });

    describe("get all items", () => {
      it("should return data from all pages", async () => {
        const items = (await c.info.items.getAll()) as unknown;
        expect(items).toBeArray();
        // biome-ignore lint/suspicious/noExplicitAny: type assert
        const itemsArr = items as any[];
        expect(itemsArr.length).toBeGreaterThan(100);
        const item = itemsArr.pop();
        validateItem(item);
      });
    });
  });

  describe("meta", () => {
    describe("server status", () => {
      it("can be retrieved", async () => {
        // biome-ignore lint/suspicious/noExplicitAny: type assert
        const isValidAnnouncement = (a: any) => {
          expect(a.message).toBeString();
          expect(a.created_at).toBeString();
          return true;
        };
        const data = await c.info.meta.getServerStatus();
        expect(data.status).toBeString();
        expect(data.status).toBe("online");
        if (typeof data.version !== "undefined") expect(data.version).toBeString();
        expect(data.max_level).toBeNumber();
        expect(data.characters_online).toBeNumber();
        expect(data.server_time).toBeString();
        expect(data.announcements).toBeArray();
        expect(data.announcements.every((e) => isValidAnnouncement(e))).toBeTrue();
        expect(data.last_wipe).toBeString();
        expect(data.next_wipe).toBeString();
      });
    });

    describe("leaderboard", () => {
      it("can be retrieved", async () => {
        // biome-ignore lint/suspicious/noExplicitAny: type assert
        const validateLeaderboardEntry = (le: any) => {
          expect(le.name).toBeString();
          expect(le.skin).toBeString();
          expect(le.achievements_points).toBeNumber();
          expect(le.level).toBeNumber();
          expect(le.total_xp).toBeNumber();
          expect(le.mining_level).toBeNumber();
          expect(le.mining_total_xp).toBeNumber();
          expect(le.woodcutting_level).toBeNumber();
          expect(le.woodcutting_total_xp).toBeNumber();
          expect(le.fishing_level).toBeNumber();
          expect(le.fishing_total_xp).toBeNumber();
          expect(le.weaponcrafting_level).toBeNumber();
          expect(le.weaponcrafting_total_xp).toBeNumber();
          expect(le.gearcrafting_level).toBeNumber();
          expect(le.gearcrafting_total_xp).toBeNumber();
          expect(le.jewelrycrafting_level).toBeNumber();
          expect(le.jewelrycrafting_total_xp).toBeNumber();
          expect(le.cooking_level).toBeNumber();
          expect(le.cooking_total_xp).toBeNumber();
          expect(le.gold).toBeNumber();
        };

        const leaders = (await c.info.meta.getLeaderboard()) as unknown;
        expect(leaders).toBeDefined();
        expect(leaders).toBeArray();
        // biome-ignore lint/suspicious/noExplicitAny: type assert
        const leadersArr = leaders as any[];
        expect(leadersArr.length).toBeGreaterThan(0);
        const leader = leadersArr.pop();
        validateLeaderboardEntry(leader);
      });
    });

    describe("events", () => {
      it("can be retrieved", async () => {
        // biome-ignore lint/suspicious/noExplicitAny: type assert
        const validateEvent = (e: any) => {
          expect(e.name).toBeString();
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

        const events = (await c.info.meta.getEvents()) as unknown;
        expect(events).toBeDefined();
        expect(events).toBeArray();
        // biome-ignore lint/suspicious/noExplicitAny: type assert
        const eventsArr = events as any[];
        expect(eventsArr.length).toBeGreaterThan(0);
        const event = eventsArr.pop();
        validateEvent(event);
      });
    });
  });
});
