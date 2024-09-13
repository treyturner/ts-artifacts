import { beforeEach, describe, expect, it } from "bun:test";
import { ArtifactsApi } from "../../src";
import { getUnknownErrorText } from "../../src/util";
import { validate } from "../validate";

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

  describe("anonymous user", () => {
    it("can make unauthenticated requests", async () => {
      // given account information is completely unset
      c.config.apiToken = undefined;
      c.config.username = undefined;
      c.config.password = undefined;

      // when a request is made to an unauthenticated endpoint
      // then an error shouldn't be thrown
      let responseData: unknown;
      try {
        responseData = await c.info.maps.get({ x: 0, y: 0 });
      } catch (err) {
        expect(
          err,
          `Couldn't call unauthenticated endpoint without auth?\n${getUnknownErrorText(err)}`,
        ).toBeUndefined();
      }

      // and the response should be valid
      validate.map(responseData);
    });
  });

  describe("token", () => {
    it("is retrieved automatically when command with auth: true is called", async () => {
      // given a valid username and password are set
      expect(c.config.username).toBeString();
      expect(c.config.username?.length).toBeGreaterThan(0);
      expect(c.config.password).toBeString();
      expect(c.config.password?.length).toBeGreaterThan(0);

      // and token is unset
      c.config.apiToken = undefined;

      // when an authenticated request is made
      // then an error shouldn't be thrown
      try {
        expect(await c.account.bank.getDetails()).not.toThrowError;
      } catch (err) {
        expect(err, `Couldn't automatically retrieve token?\n${getUnknownErrorText(err)}`).toBeUndefined();
      }

      // and the client tokenshould be automatically set
      const apiToken: unknown = c.config.apiToken;
      expect(apiToken).toBeString();
      expect((apiToken as string).length).toBeGreaterThan(0);
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
        await c.info.meta.getServerStatus();
      } catch (err) {
        expect(
          err,
          `Couldn't complete unauthenticated call without apiToken?\n${getUnknownErrorText(err)}`,
        ).toBeUndefined();
      }

      //and the client token should remain unset
      const apiToken: unknown = c.config.apiToken;
      expect(apiToken).toBeUndefined();
    });
  });

  describe("bank", () => {
    describe("get details", () => {
      it("should return account bank details", async () => {
        const responseData: unknown = await c.account.bank.getDetails();
        validate.bank(responseData);
      });
    });
  });
});
