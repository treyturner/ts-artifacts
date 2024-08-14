import { type SupportedMethod, call } from "../util";

export async function buy(code: string, quantity: number, price: number) {
  const path = "my/:character/action/ge/buy";
  const method: SupportedMethod = "POST";
  const body = { code, quantity, price };
  return call({ method, path, body });
}

export async function sell(code: string, quantity: number, price: number) {
  const path = "my/:character/action/ge/sell";
  const method: SupportedMethod = "POST";
  const body = { code, quantity, price };
  return call({ method, path, body });
}

export default { buy, sell };
