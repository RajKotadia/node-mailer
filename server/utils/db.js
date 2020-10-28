const fs = require("fs").promises;
const path = require("path");

const dbPath = path.resolve("../", "../", "database");

// get the list of users from json file
const getUsers = async () => {
	try {
		const jsonString = await fs.readFile(`${dbPath}/users.json`, "utf8");
		return JSON.parse(jsonString);
	} catch (err) {
		// if the file does not exist;
		// create ta new file with an empty list of users
		if (err.code === "ENOENT") {
			await saveUsers([]);
			return [];
		}
		throw new Error(err.message);
	}
};

// save the users to json file
const saveUsers = async (users) => {
	try {
		const jsonString = JSON.stringify(users, null, 4);
		await fs.writeFile(`${dbPath}/users.json`, jsonString, "utf8");
	} catch (err) {
		throw new Error(err.message);
	}
};

module.exports = {
	getUsers,
	saveUsers,
};
