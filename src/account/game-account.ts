import type { HasClient } from "..";
import { infoCall } from "../http";
import type { AddAccountReq, CallOptions, ChangePasswordReq, Response, TokenResponse } from "../index";
import { getCallerName } from "../util";

export const account = { changePassword, create, getToken };

async function getToken(this: HasClient, username = process.env.USERNAME, password = process.env.PASSWORD) {
  const method = "POST";
  const path = "/token";
  const headers = { Authorization: Buffer.from(`${username}:${password}`, "binary").toString("base64") };
  const opts: CallOptions = { method, path, headers, config: this.client.config };
  return (await infoCall<TokenResponse>(getCallerName(), opts)).token;
}

function create(this: HasClient, body: AddAccountReq) {
  const method = "POST";
  const path = "/accounts/create";
  const headers = { Authorization: undefined };
  const opts: CallOptions = { method, path, headers, body, config: this.client.config };
  return infoCall<Response>(getCallerName(), opts);
}

function changePassword(this: HasClient, body: ChangePasswordReq) {
  const method = "POST";
  const path = "/my/change_password";
  const opts: CallOptions = { method, path, body, config: this.client.config };
  return infoCall<Response>(getCallerName(), opts);
}
