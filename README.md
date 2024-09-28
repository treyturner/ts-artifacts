# ts-artifacts-api-client

A typed and promisified API client for [Artifacts MMO](https://artifactsmmo.com).

## Status

[![Checks and tests](https://github.com/treyturner/ts-artifacts-api-client/actions/workflows/test.yaml/badge.svg)](https://github.com/treyturner/ts-artifacts-api-client/actions/workflows/test.yaml)\
[![Last successful build published to npm registry](https://github.com/treyturner/ts-artifacts-api-client/actions/workflows/release.yaml/badge.svg)](https://github.com/treyturner/ts-artifacts-api-client/actions/workflows/release.yaml)

This is a new project in early development. Pull requests, issues, and suggestions are welcome. Use at your own risk; no warranty is expressed or implied.

API coverage is believed to be complete. Some amount of automated E2E testing passed against the game's production API at the time of last release, but changes to the game may cause breakage until this client can be updated.

Automated test coverage will be expanded in the future but isn't a priority at this time.

At this time, development is driven by the needs of my [CLI](https://github.com/treyturner/ts-artifacts-cli). I'm currently exploring approaches to game and client state management.

## Installation

Add as a dependency to your project's `package.json`:

```sh
user@dev:~/ts-artifacts-api-client$ bun add @trey.turner/artifacts-api-client
```

Then install using your package manager or runtime of choice, like [bun](https://bun.sh):

```sh
user@dev:~/ts-artifacts-api-client$ bun i
```

## Configuration

Configuration can be supplied via environment variables or constructor arguments.

One of (an API token) or (a username and password) are required to make authenticated requests, but you can mine data out of `info` endpoints without them. A token will be retrieved automatically if not set when calling an authenticated endpoint, or it can be acquired programatically at any time with `await client.setToken()`.

Calling an action before selecting a character will cause an exception to be thrown.

Reconfigure an existing client by setting its `config` property, ie. `client.config.character = "Cujo"` or `client.config.username = "AmonTobin"`.

### Environment variables

If you did a development install of dependencies, you can copy [`example.env`](example.env) in the repo root to `.env` and edit it to supply values to supported environment variables. Otherwise, they can be set using whatever mechanism available to you:

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

When your required configuration is set into environment variables, you can use a no-arg constructor:

```ts
import { ArtifactsApi } from '@trey.turner/artifacts-api-client';

const api = new ArtifactsApi();
// will logs response to console if configured as such
await api.info.meta.getServerStatus();
```

### Configuration via constructor

```ts
import { ArtifactsApi } from '@trey.turner/artifacts-api-client';

const ness = new ArtifactsApi({
  // To make authenticated requests, supply a username and password
  username: "foo",
  password: "bar",
  // An API token can be used instead, but must be valid if supplied
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
await ness.move.to(0, 1);
// or using a coordinate object
await ness.move.to({ x: 0, y: 1 });
// or by specifying a resource type and code
await ness.move.toA("resource", "copper_ore");
```

The `await` currently includes waiting for any resulting cooldown to expire. This will likely change in the future with the introduction of party management.

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
│   ├── resources
|   │   ├── get()
|   │   └── getAll()
|   └── tasks
|       ├── get()
|       ├── getAll()
|       ├── getAllRewards()
|       └── getReward()
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
    ├── exchange()
    └── trade()
```
