import { beforeEach, describe, expect, it } from "bun:test";
import { ArtifactsApi } from "../../src";
import { getUnknownErrorText } from "../../src/util";
import { timeout } from "../config.e2e";
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
    it(
      "can make unauthenticated requests",
      async () => {
        // given account information is completely unset
        c.config.apiToken = undefined;
        c.config.username = undefined;
        c.config.password = undefined;

        // when a request is made to an unauthenticated endpoint
        // then an error shouldn't be thrown
        let data: unknown;
        try {
          data = await c.info.maps.get({ x: 0, y: 0 });
        } catch (err) {
          expect(
            err,
            `Couldn't call unauthenticated endpoint without auth?\n${getUnknownErrorText(err)}`,
          ).toBeUndefined();
        }

        // and the response should be valid
        validate.map(data);
      },
      { timeout },
    );
  });

  describe("token", () => {
    it(
      "is retrieved automatically if unset when auth'd endpoint is called",
      async () => {
        // given a valid username and password are set
        expect(c.config.username).toBeString();
        expect(c.config.username?.length).toBeGreaterThan(0);
        expect(c.config.password).toBeString();
        expect(c.config.password?.length).toBeGreaterThan(0);

        // and token is unset
        c.config.apiToken = undefined;

        // when an authenticated request is made then an error shouldn't be thrown
        try {
          await c.account.bank.getDetails();
        } catch (err) {
          expect(err, `Couldn't automatically retrieve token?\n${getUnknownErrorText(err)}`).toBeUndefined();
        }

        // and the client token should be automatically set
        const apiToken: unknown = c.config.apiToken;
        expect(apiToken).toBeString();
        expect((apiToken as string).length).toBeGreaterThan(0);
      },
      { timeout },
    );

    it(
      "isn't retrieved automatically when unauth'd endpoint is called",
      async () => {
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
      },
      { timeout },
    );
  });

  describe("bank", () => {
    describe("get details", () => {
      it(
        "should return account bank details",
        async () => {
          const data: unknown = await c.account.bank.getDetails();
          validate.bankDetails(data);
        },
        { timeout },
      );
    });

    describe("get items", () => {
      it(
        "should return account bank items",
        async () => {
          const data: unknown = await c.account.bank.getItems();
          validate.bankItems(data);
        },
        { timeout },
      );
    });
  });
});
