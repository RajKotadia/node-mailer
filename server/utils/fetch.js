const fetch = require("node-fetch");

// wrapper around fetch-api
const fetcher = async (url, fetchOptions) => {
	const options = {
		method: "POST",
		body: JSON.stringify(fetchOptions.body),
	};

	if (fetchOptions.headers) {
		options.headers = fetchOptions.headers;
	}

	try {
		const response = await fetch(url, options);
		const data = await response.json();
		return data;
	} catch (err) {
		throw new Error(err.message);
	}
};

module.exports = fetcher;
