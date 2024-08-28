import { infoCall } from "../http";
import type { AddAccountReq, ChangePasswordReq, Response, TokenResponse } from "../types";
import { getCallerName } from "../util";

export const account = {
  create,
  getToken,
  changePassword,
};

async function getToken(username = process.env.USERNAME, password = process.env.PASSWORD) {
  const method = "POST";
  const path = "/token";
  const headers = { Authorization: Buffer.from(`${username}:${password}`, "binary").toString("base64") };
  return (await infoCall<TokenResponse>(getCallerName(), { method, path, headers })).token;
}

function create(body: AddAccountReq) {
  const method = "POST";
  const path = "/accounts/create";
  const headers = { Authorization: undefined };
  return infoCall<Response>(getCallerName(), { method, path, headers, body });
}

function changePassword(body: ChangePasswordReq) {
  const method = "POST";
  const path = "/my/change_password";
  return infoCall<Response>(getCallerName(), { method, path, body });
}
