const { googleClientId, googleClientSecret } = require("../config");
const { getUsers, saveUsers } = require("../utils/db");
const fetcher = require("../utils/fetch");

// check whether the current user is authenticated
const authCheck = async (req, res, next) => {
	const { user } = req;

	if (!user) {
		return res.status(401).json({
			success: false,
			message: "Unauthorized",
		});
	}

	next();
};

// to check and renew the access token if it is expired
const validateToken = async (req, res, next) => {
	const { user } = req;

	try {
		const currentTime = Date.now();
		const createdAt = new Date(user.tokenCreatedAt).getTime();

		// if the access token is expired, renew it
		if (currentTime - createdAt > 3595 * 1000) {
			const endpoint = "https://oauth2.googleapis.com/token";

			// to fetch a new access token from Google
			const response = await fetcher(endpoint, {
				body: {
					client_id: googleClientId,
					client_secret: googleClientSecret,
					refresh_token: user.refreshToken,
					grant_type: "refresh_token",
				},
			});

			// update the access token of current user
			const users = await getUsers();
			const currentUser = users.filter((u) => u.id === user.id)[0];
			currentUser.accessToken = response.access_token;
			currentUser.tokenCreatedAt = Date.now();
			await saveUsers(users);

			req.user = currentUser;
		}

		next();
	} catch (err) {
		res.status(500);
		next(err);
	}
};

module.exports = {
	authCheck,
	validateToken,
};
