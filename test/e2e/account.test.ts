import { beforeEach, describe, expect, it } from "bun:test";
import { ArtifactsApi } from "../../src";
import { pp } from "../../src/util";

let c: ArtifactsApi;

describe("account", () => {
  beforeEach(() => {
    c = new ArtifactsApi({
      prefs: {
        logHttpRequests: false,
        logHttpResponses: false,
      },
    });
  });

  describe("bank", () => {
    describe("get details", () => {
      it("should return account bank details", async () => {
        const response = (await c.account.bank.getDetails()) as unknown;
        expect(response).toBeDefined();
        // biome-ignore lint/suspicious/noExplicitAny: type assert
        const details = response as any;
        expect(details.slots).toBeNumber();
        expect(details.expansions).toBeNumber();
        expect(details.next_expansion_cost).toBeNumber();
        expect(details.gold).toBeNumber();
      });
    });
  });
});
