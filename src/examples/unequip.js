//Use node unequip.js in the terminal for execute the script.
const server = process.env.API_BASEURL;
//Your token is automatically set
const token = process.env.API_TOKEN;
//Put your character name here
const character = process.env.CHARACTER;

async function unequip() {
	const url = server + "/my/" + character + "/action/unequip";
	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			Authorization: "Bearer " + token,
		},
		body: '{"slot":"weapon"}', //change the slot here
	};

	try {
		const response = await fetch(url, options);
		const { data } = await response.json();
		console.log(data);
	} catch (error) {
		console.log(error);
	}
}

unequip();
