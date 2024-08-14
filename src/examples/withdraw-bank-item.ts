//Use node withdraw_bank_item.js in the terminal for execute the script.
const server = process.env.API_BASEURL;
//Your token is automatically set
const token = process.env.API_TOKEN;
//Put your character name here
const character = process.env.CHARACTER;

async function withdrawBank() {
	const url = `${server}/my/${character}/action/bank/withdraw`;
	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: '{"code":"string","quantity":1}', //change code item and quantity here
	};

	try {
		const response = await fetch(url, options);
		// biome-ignore lint/suspicious/noExplicitAny: type forthcoming
		const { data } = (await response.json()) as any;
		console.log(data);
	} catch (error) {
		console.log(error);
	}
}

withdrawBank();
