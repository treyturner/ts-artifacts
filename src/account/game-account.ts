import { infoCall } from "../http";
import type { AddAccountReq, CallOptions, ChangePasswordReq, HasClient, Response, TokenResponse } from "../index";
import { getCallerName } from "../util";

export const account = { changePassword, create, getToken };

async function getToken(this: HasClient) {
  const method = "POST";
  const path = "/token";
  const userPass = `${this.client.config.username}:${this.client.config.password}`;
  const b64str = Buffer.from(userPass, "binary").toString("base64");
  const headers = { Authorization: `Basic ${b64str}` };
  // Auth must be false or this method will infinitely recurse
  const opts: CallOptions = { auth: false, method, path, headers, client: this.client };
  const responseBody = await infoCall<TokenResponse>(getCallerName(), opts);
  return responseBody.token;
}

async function create(this: HasClient, body: AddAccountReq) {
  const method = "POST";
  const path = "/accounts/create";
  const headers = { Authorization: undefined };
  const opts: CallOptions = { auth: false, method, path, headers, body, client: this.client };
  const responseBody = await infoCall<Response>(getCallerName(), opts);
  return responseBody.message;
}

async function changePassword(this: HasClient, body: ChangePasswordReq) {
  const method = "POST";
  const path = "/my/change_password";
  const opts: CallOptions = { auth: true, method, path, body, client: this.client };
  const responseBody = await infoCall<Response>(getCallerName(), opts);
  return responseBody.message;
}
