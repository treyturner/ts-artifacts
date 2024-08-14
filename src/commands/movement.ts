import { call, type SupportedMethod } from "../util";

export async function move(x: number, y: number) {
	const path = "my/:character/action/move";
	const method: SupportedMethod = "POST";
	const body = { x, y };
	return call({ method, path, body });
}

export default { move };
