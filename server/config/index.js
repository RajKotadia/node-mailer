require("dotenv").config();

module.exports = {
	port: process.env.PORT || 1337,
	googleClientId: process.env.GOOGLE_CLIENT_ID,
	googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
	googleApiKey: process.env.GOOGLE_API_KEY,
	cookieKey: process.env.COOKIE_KEY,
};
