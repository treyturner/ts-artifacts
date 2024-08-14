import { type SupportedMethod, call } from "../util";

export async function craft(code: string, quantity: number) {
	const path = "my/:character/action/crafting";
	const method: SupportedMethod = "POST";
	const body = { code, quantity };
	return call({ method, path, body });
}

export default { craft };
