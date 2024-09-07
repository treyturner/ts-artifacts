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
      it.todo("can be retrieved", async () => {});
    });

    describe("events", () => {
      it.todo("can be retrieved", async () => {});
    });
  });
});
