import { ArtifactsApi } from "@trey.turner/artifacts-api-client";

const api = new ArtifactsApi();
await api.info.meta.getServerStatus();
