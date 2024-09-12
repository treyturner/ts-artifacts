import { beforeEach, describe, expect, it } from "bun:test";
import { ArtifactsApi } from "../../src";
import { getUnknownErrorText } from "../../src/util";

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

  describe("token", () => {
    it("is retrieved automatically when command with auth: true is called", async () => {
      //given a valid username and password are set
      expect(c.config.username).toBeString();
      expect(c.config.username?.length).toBeGreaterThan(0);
      expect(c.config.password).toBeString();
      expect(c.config.password?.length).toBeGreaterThan(0);

      //and token is unset
      c.config.apiToken = undefined;

      //when an authenticated request is made, then an error shouldn't be thrown
      try {
        expect(await c.account.bank.getDetails()).not.toThrowError;
      } catch (err) {
        expect(err, `Couldn't automatically retrieve token?\n${getUnknownErrorText(err)}`).toBeUndefined();
      }

      //and the client tokenshould be automatically set
      // biome-ignore lint/suspicious/noExplicitAny: type assert
      const apiToken: any = c.config.apiToken;
      expect(apiToken).toBeString();
      expect(apiToken.length).toBeGreaterThan(0);
    });

    it("isn't retrieved automatically when command with auth: false is called", async () => {
      //given a valid username and password are set
      expect(c.config.username).toBeString();
      expect(c.config.username?.length).toBeGreaterThan(0);
      expect(c.config.password).toBeString();
      expect(c.config.password?.length).toBeGreaterThan(0);

      //and token is unset
      c.config.apiToken = undefined;

      //when an unauthenticated request is made, then an error shouldn't be thrown
      try {
        expect(await c.info.meta.getServerStatus()).not.toThrowError;
      } catch (err) {
        expect(err, `Couldn't complete unauthenticated call?\n${getUnknownErrorText(err)}`).toBeUndefined();
      }

      //and the client token should remain unset
      // biome-ignore lint/suspicious/noExplicitAny: type assert
      const apiToken: any = c.config.apiToken;
      expect(apiToken).toBeUndefined();
    });
  });

  describe("bank", () => {
    describe("get details", () => {
      it("should return account bank details", async () => {
        const response: unknown = await c.account.bank.getDetails();
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
