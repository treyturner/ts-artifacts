# ts-artifacts

Monorepo for TypeScript packages related to [Artifacts MMO](https://artifactsmmo.com).

## Packages

| Folder                                             | Name                                                                                                                 | Description                               |
|----------------------------------------------------|----------------------------------------------------------------------------------------------------------------------|-------------------------------------------|
| [`api-client`](packages/api-client/)               | [`@trey.turner/artifacts-api-client`](https://www.npmjs.com/package/@trey.turner/artifacts-api-client)               | Typed and promisified API client in ESM   |
| [`mocks-counterfact`](packages/mocks-counterfact/) | [`@trey.turner/artifacts-mocks-counterfact`](https://www.npmjs.com/package/@trey.turner/artifacts-mocks-counterfact) | Mocks & types generated from OpenAPI spec |
| [`sandbox`](packages/api-client/)                  | Not published                                                                                                        | Code staging area                         |

## Tooling

- Bun (<https://bun.sh>)
- Biome (<https://biomejs.dev>)
- Counterfact (<https://counterfact.dev>)
- Commitlint (<https://github.com/conventional-changelog/commitlint>)
