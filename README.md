# ts-artifacts-api-client

A typed and promisified API client for [Artifacts MMO](https://artifactsmmo.com).

## Status

[![Tests](https://github.com/treyturner/ts-artifacts-api-client/actions/workflows/test.yaml/badge.svg)](https://github.com/treyturner/ts-artifacts-api-client/actions/workflows/test.yaml)\
[![Publish to npm](https://github.com/treyturner/ts-artifacts-api-client/actions/workflows/release-please.yaml/badge.svg)](https://github.com/treyturner/ts-artifacts-api-client/actions/workflows/release-please.yaml)

This is a new project in early development. Pull requests, issues, and suggestions are welcome. Use at your own risk; no warranty is expressed or implied.

API coverage is believed to be complete. Some amount of automated E2E testing passed against the game's production API at the time of last release, but changes to the game may cause breakage until this client can be updated.

Automated test coverage will be expanded in the future but isn't a priority at this time.

## Configuration

Configuration can be supplied via environment variables or constructor arguments.

One of (an API token) or (a username and password) are required to make authenticated requests, but you can mine data out of `info` endpoints without them.

Calling an action (or any endpoint with `{name}` in the path) before configuring the client with a character will cause an exception to be thrown.

Reconfigure a created client by modifying it's `config` property, ie. `client.config.character = "Cujo"` or `client.config.username = "AmonTobin"`.

### Environment variables

Create an `.env` file in the repo root or supply values to supported environment variables using any other means:

| Variable                               | Description                                         | Default Value                  |
|----------------------------------------|-----------------------------------------------------|--------------------------------|
| `ARTIFACTS_API_BASEURL`                | Artifacts MMO API base URL                          | `https://api.artifactsmmo.com` |
| `ARTIFACTS_API_TOKEN`                  | Pre-generated API token                             | N/A                            |
| `ARTIFACTS_USERNAME`                   | Account username                                    | N/A                            |
| `ARTIFACTS_PASSWORD`                   | Account password                                    | N/A                            |
| `ARTIFACTS_CHARACTER`                  | Character to control                                | N/A                            |
| `ARTIFACTS_LOG_HTTP_REQUESTS`          | Log HTTP requests to console?                       | `1`                            |
| `ARTIFACTS_LOG_HTTP_RESPONSES`         | Log HTTP responses to console?                      | `1`                            |
| `ARTIFACTS_HIDE_CHARACTER_IN_RESPONSE` | Hide character state when logging response bodies?  | `1`                            |
| `ARTIFACTS_HIDE_COOLDOWN_IN_RESPONSE`  | Hide cooldown details when logging response bodies? | `1`                            |

### Configuration via constructor

```ts
import { ArtifactsApi } from '@trey.turner/artifacts-api-client';

const client = new ArtifactsApi({
  // To make authenticated requests, provide either a username and password
  username: "foo",
  password: "bar",
  // or an API token
  apiToken: "abc123",
  // Everything else is optional (though character is required to take any action)
  character: "Ness",
  prefs: {
    logHttpRequests: true,
    logHttpResponses: true,
    hideCharacterInResponseLog: true,
    hideCooldownInResponseLog: true,
  },
});
```

## Usage

Just a simple example for now of different ways to move a character:

```ts
// using discrete x/y coordinates
await client.move.to(0, 1);
// or using a coordinate object
await client.move.to({ x: 0, y: 1 });
// or by specifying a resource type and code
await client.move.toA("resource", "copper_ore");
```

The `await` includes waiting for any resulting cooldown to expire.

## Structure

This library takes an opinionated approach to organizing the game's API endpoints.

`config` is the client's [config object](src/config.ts#L36) and is editable after instantiation.

[`account`](src/account) and [`info`](src/info) calls generally do not result in a cooldown; most other commands are actions which do.

```js
client
├── config
├── account
│   ├── bank
│   │   ├── getDetails()
│   │   └── getItems()
│   ├── changePassword()
│   ├── characters
│   │   ├── create()
│   │   ├── destroy()
│   │   ├── getAll()
│   │   └── getLogs()
│   ├── create()
│   └── getToken()
├── bank
│   ├── buyExpansion()
│   ├── depositGold()
│   ├── depositItem()
│   ├── depositItems()
│   ├── withdrawGold()
│   ├── withdrawItem()
│   └── withdrawItems()
├── craft
│   └── once()
├── exchange
│   ├── buy()
│   └── sell()
├── fight
│   ├── continuously()
│   └── once()
├── gather
│   ├── continuously()
│   └── once()
├── info
│   ├── achievements
│   │   ├── get()
│   │   ├── getAll()
│   │   └── getCharacterAchievements()
│   ├── characters
│   │   ├── get()
│   │   └── getAll()
│   ├── exchangeItems
│   │   ├── get()
│   │   └── getAll()
│   ├── items
│   │   ├── get()
│   │   └── getAll()
│   ├── maps
│   │   ├── get()
│   │   └── getAll()
│   ├── meta
│   │   ├── getEvents()
│   │   ├── getLeaderboard()
│   │   └── getServerStatus()
│   ├── monsters
│   │   ├── get()
│   │   └── getAll()
│   └── resources
|       ├── get()
|       └── getAll()
├── items
│   ├── discard()
│   ├── equip()
│   ├── recycle()
│   └── unequip()
├── move
│   ├── to(x, y)
│   ├── to({ x, y })
│   └── toA(contentType, contentCode)
└── tasks
    ├── accept()
    ├── cancel()
    ├── complete()
    └── exchange()
```
