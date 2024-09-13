[![Tests](https://github.com/treyturner/ts-artifacts-api-client/actions/workflows/test.yaml/badge.svg)](https://github.com/treyturner/ts-artifacts-api-client/actions/workflows/test.yaml)

# ts-artifacts-api-client

`@trey.turner/artifacts-api-client` is an API client for [Artifacts MMO](https://artifactsmmo.com) written in TypeScript.

## Development Status

This is a new project in early development. It is at best alpha software and no warranty is expressed or implied. Pull requests and issues are welcome.

API coverage is believed to be complete. It was manually tested to some extent at the time of last release, but updates to the game's API may cause breakage until adjustments can be made. Automated test coverage will be expanded in the future.

I aspire to develop some additional bells and whistles, including wrapping multiple clients into some form of party management.

## Configuration

Configuration can be supplied via environment variables or constructor arguments.

One of (an API token) or (a username and password) are required.

Specifying a character isn't required to instantiate a client, but requests that require one (with `{name}` in the path) will throw an exception unless one has been configured via `client.config.character = "foobarbaz"`.

### Environment variables

Create an `.env` file in the repo root or use any other means to supply values to supported environment variables:

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

Worth noting: [`account`](src/account) and [`info`](src/info) calls generally do not result in a cooldown; most other commands are actions which do.

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
