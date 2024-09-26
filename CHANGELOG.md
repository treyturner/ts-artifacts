# Changelog

## [1.0.6](https://github.com/treyturner/ts-artifacts-api-client/compare/v1.0.5...v1.0.6) (2024-09-26)


### Bug Fixes

* remove redundant exported ArtifactsApi type ([#19](https://github.com/treyturner/ts-artifacts-api-client/issues/19)) ([0f658b5](https://github.com/treyturner/ts-artifacts-api-client/commit/0f658b5cd435f0c6b833029ee40447ef91b81df1))

## [1.0.5](https://github.com/treyturner/ts-artifacts-api-client/compare/v1.0.4...v1.0.5) (2024-09-26)


### Features

* update gen'd types, add new task endpoints and unpaged reqs ([#18](https://github.com/treyturner/ts-artifacts-api-client/issues/18)) ([8eb05e0](https://github.com/treyturner/ts-artifacts-api-client/commit/8eb05e0f61a1c63a30c2bbd7ec658a7fc3354fe7))


### Code Refactoring

* move types ([#16](https://github.com/treyturner/ts-artifacts-api-client/issues/16)) ([082cf0c](https://github.com/treyturner/ts-artifacts-api-client/commit/082cf0c876ac067f359aefa42f464e823fb2e881))

## [1.0.4](https://github.com/treyturner/ts-artifacts-api-client/compare/v1.0.3...v1.0.4) (2024-09-25)


### Bug Fixes

* make node-inspect-extracted prod dependency ([#14](https://github.com/treyturner/ts-artifacts-api-client/issues/14)) ([97461a8](https://github.com/treyturner/ts-artifacts-api-client/commit/97461a83d1b33b0cce2acbaecb898ed460f6d945))

## [1.0.3](https://github.com/treyturner/ts-artifacts-api-client/compare/v1.0.2...v1.0.3) (2024-09-17)


### Bug Fixes

* only assert needed path tokens ([#10](https://github.com/treyturner/ts-artifacts-api-client/issues/10)) ([2a116b8](https://github.com/treyturner/ts-artifacts-api-client/commit/2a116b800d42925bc733528dba5ef44ebd171d92))

## [1.0.2](https://github.com/treyturner/ts-artifacts-api-client/compare/v1.0.1...v1.0.2) (2024-09-17)


### Documentation

* fix publish badge ([#8](https://github.com/treyturner/ts-artifacts-api-client/issues/8)) ([7b8a473](https://github.com/treyturner/ts-artifacts-api-client/commit/7b8a4736425c927c69a2e0757a2f04e2345a6758))

## [1.0.1](https://github.com/treyturner/ts-artifacts-api-client/compare/v1.0.0...v1.0.1) (2024-09-17)


### Features

* support specifying HTTP timeout ([#6](https://github.com/treyturner/ts-artifacts-api-client/issues/6)) ([e3c34d2](https://github.com/treyturner/ts-artifacts-api-client/commit/e3c34d20ba0b4db0854f2330b2a0146fb568b305))


### Miscellaneous Chores

* release 1.0.1 ([#4](https://github.com/treyturner/ts-artifacts-api-client/issues/4)) ([baf47de](https://github.com/treyturner/ts-artifacts-api-client/commit/baf47dedc210a247a86d897474af5e51401c43b9))

## 1.0.0 (2024-09-15)


### Features

* add missing getAllCharacters call, reorganize chars & achievements ([6ac276f](https://github.com/treyturner/ts-artifacts-api-client/commit/6ac276f253489eaf31b473a0eefc27825aea60c3))
* attempt to auth automatically when needed ([e611e9c](https://github.com/treyturner/ts-artifacts-api-client/commit/e611e9c2b2d3d72c9ddfdde1503132eac433c7a4))
* **characters:** add getAllLogs, extract create and destroy data ([2a41c19](https://github.com/treyturner/ts-artifacts-api-client/commit/2a41c1940c359cad4e968101d189c75644ec090b))


### Bug Fixes

* **account bank:** fix http method in getDetails() ([8f17997](https://github.com/treyturner/ts-artifacts-api-client/commit/8f1799742c6667bc8cfc1be338ef09e73ab21e8f))
* **account endpoints:** extract message from create() and changePassword() responses ([9f9cba2](https://github.com/treyturner/ts-artifacts-api-client/commit/9f9cba289126eae97f23c9418a60fe7678cd5809))
* extract maps.get() data property from response like all other infoCalls ([1c15499](https://github.com/treyturner/ts-artifacts-api-client/commit/1c154996b694e599f26d8bb2f31b75d6b403b5f1))
* getToken() ([6ac1dba](https://github.com/treyturner/ts-artifacts-api-client/commit/6ac1dbaa15539043db6716d89eadc057be53d04e))
* return type in meta.getLeaderboard() ([3740a11](https://github.com/treyturner/ts-artifacts-api-client/commit/3740a117eac686ad2e73b26928b50a1f74c94d29))
