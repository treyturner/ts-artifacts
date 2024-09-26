import { beforeEach, describe, expect, it } from "bun:test";
import { ArtifactsApi } from "../../src";
import { timeout } from "../config.e2e";
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
      it(
        "should return data for an item",
        async () => {
          const data = (await c.info.items.get({ code: "copper_ore" })) as unknown;
          expect(data).toBeObject();
          expect(data).toHaveProperty("item");
          expect(data).toHaveProperty("ge");
          const wrapper = data as { item: unknown; ge: unknown };
          validate.item(wrapper.item);
          validate.geItem(wrapper.ge);
        },
        { timeout },
      );
    });

    describe("get all items", () => {
      it(
        "should return data from all pages",
        async () => {
          const data = (await c.info.items.getAll()) as unknown;
          expect(data).toBeArray();
          const items = data as unknown[];
          expect(items.length).toBeGreaterThan(100);
          const item = items.pop();
          validate.item(item);
        },
        { timeout },
      );
    });
  });

  describe("meta", () => {
    describe("server status", () => {
      it(
        "can be retrieved",
        async () => {
          const data = (await c.info.meta.getServerStatus()) as unknown;
          expect(data).toBeObject();
          validate.serverStatus(data);
        },
        { timeout },
      );
    });

    describe("leaderboard", () => {
      it(
        "can be retrieved",
        async () => {
          const data = (await c.info.meta.getLeaderboard()) as unknown;
          expect(data).toBeArray();
          const entries = data as unknown[];
          expect(entries.length).toBeGreaterThan(0);
          const leader = entries.pop();
          validate.leaderboardEntry(leader);
        },
        { timeout },
      );
    });

    describe("events", () => {
      it(
        "can be retrieved",
        async () => {
          const data = (await c.info.meta.getEvents()) as unknown;
          expect(data).toBeArray();
          const events = data as unknown[];
          if (events.length > 0) validate.event(events.pop());
        },
        { timeout },
      );
    });
  });
});
