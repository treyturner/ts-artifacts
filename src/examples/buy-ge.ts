//Use node buy_ge.js in the terminal for execute the script.
const server = process.env.API_BASEURL;
//Your token is automatically set
const token = process.env.API_TOKEN;
//Put your character name here
const character = process.env.CHARACTER;

async function buyGE() {
	const url = `${server}/my/${character}/action/ge/buy`;
	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: '{"code":"string","quantity":1,"price":1}', //change the code and the quantity
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

buyGE();
