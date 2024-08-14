import { call } from "../util";

export function complete() {
	const method = "POST";
	const path = "my/:character/action/task/complete";
	return call({ method, path });
}

export function exchange() {
	const method = "POST";
	const path = "my/:character/action/task/exchange";
	return call({ method, path });
}

export function accept() {
	const method = "POST";
	const path = "my/:character/action/task/exchange";
	return call({ method, path });
}

export default { accept, exchange, complete };
