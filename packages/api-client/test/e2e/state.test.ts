import { afterEach, beforeEach, describe, expect, it, spyOn } from "bun:test";
import { clearMocks, mock } from "bun-bagel";
import { ArtifactsApi } from "../../src";

let c: ArtifactsApi;

beforeEach(() => {
  c = new ArtifactsApi({
    prefs: {
      logHttpRequests: true,
      logHttpResponses: true,
    },
  });
});

afterEach(() => {
  clearMocks();
});

describe("state management", () => {
  describe("sync state", () => {
    it("syncs account, game, and world info", async () => {
      mock(`${c.config.apiHost}/*`, { response: { data: { data: [] } } });
      const spies = {
        syncWorldInfo: spyOn(c, "syncWorldInfo"),
        syncGameInfo: spyOn(c, "syncGameInfo"),
        syncAccountInfo: spyOn(c, "syncAccountInfo"),
      };

      await c.sync();
      expect(spies.syncWorldInfo).toHaveBeenCalledTimes(1);
      expect(spies.syncGameInfo).toHaveBeenCalledTimes(1);
      expect(spies.syncAccountInfo).toHaveBeenCalledTimes(1);
    });
  });
});
