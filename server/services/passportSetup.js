const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { googleClientId, googleClientSecret } = require("../config");

passport.use(
	new GoogleStrategy(
		{
			clientID: googleClientId,
			clientSecret: googleClientSecret,
			callbackURL: "/api/auth/google/callback",
		},
		(accessToken, refreshToken, profile, done) => {
			// the callback function that is called on successful OAuth2 process
		}
	)
);
