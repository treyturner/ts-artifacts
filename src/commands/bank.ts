import { type SupportedMethod, call } from "../util";

export async function depositGold(quantity: number) {
	const path = "my/:character/action/bank/deposit/gold";
	const method: SupportedMethod = "POST";
	const body = { quantity };
	return call({ method, path, body });
}

export async function withdrawGold(quantity: number) {
	const path = "my/:character/action/bank/withdraw/gold";
	const method: SupportedMethod = "POST";
	const body = { quantity };
	return call({ method, path, body });
}

export async function depositItem(code: string, quantity: number) {
	const path = "my/:character/action/bank/deposit";
	const method: SupportedMethod = "POST";
	const body = { code, quantity };
	return call({ method, path, body });
}

export async function withdrawItem(code: string, quantity: number) {
	const path = "my/:character/action/bank/withdraw";
	const method: SupportedMethod = "POST";
	const body = { code, quantity };
	return call({ method, path, body });
}

export default { depositGold, depositItem, withdrawGold, withdrawItem };
