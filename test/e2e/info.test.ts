import { beforeEach, describe, expect, it } from "bun:test";
import { ArtifactsApi } from "../../src";
import { validate } from "../validate";

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
    describe("get item", () => {
      it("should return data for an item", async () => {
        const item = (await c.info.items.get({ code: "copper_ore" })) as unknown;
        expect(item).toBeObject();
        // biome-ignore lint/suspicious/noExplicitAny: type assert
        const itemObj = item as NonNullable<any>;
        expect(itemObj.item).toBeObject();
        expect(itemObj.ge).toBeObject();
        validate.item(itemObj.item);
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
        validate.item(item);
      });
    });
  });

  describe("meta", () => {
    describe("server status", () => {
      it("can be retrieved", async () => {
        const data = (await c.info.meta.getServerStatus()) as unknown;
        expect(data).toBeObject();
        validate.serverStatus(data);
      });
    });

    describe("leaderboard", () => {
      it("can be retrieved", async () => {
        const leaders = (await c.info.meta.getLeaderboard()) as unknown;
        expect(leaders).toBeArray();
        // biome-ignore lint/suspicious/noExplicitAny: type assert
        const leadersArr = leaders as any[];
        expect(leadersArr.length).toBeGreaterThan(0);
        const leader = leadersArr.pop();
        validate.leaderboardEntry(leader);
      });
    });

    describe("events", () => {
      it("can be retrieved", async () => {
        const events = (await c.info.meta.getEvents()) as unknown;
        expect(events).toBeArray();
        // biome-ignore lint/suspicious/noExplicitAny: type assert
        const eventsArr = events as any[];
        if (eventsArr.length > 0) validate.event(eventsArr.pop());
      });
    });
  });
});
