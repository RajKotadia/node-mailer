const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const { v4: uuidv4 } = require("uuid");
const { googleClientId, googleClientSecret } = require("../config");
const { getUsers, saveUsers } = require("../utils/db");

// create a cookie containing the id of current user returned by passport callback function
passport.serializeUser((user, done) => {
	done(null, user.id);
});

// get the current user from the cookie returned from the client and attach it to req.user
passport.deserializeUser(async (id, done) => {
	try {
		const users = await getUsers();
		const user = users.filter((user) => user.id === id)[0];
		done(null, user);
	} catch (err) {
		done(err);
	}
});

passport.use(
	new GoogleStrategy(
		{
			clientID: googleClientId,
			clientSecret: googleClientSecret,
			callbackURL: "/api/auth/google/callback",
		},
		async (accessToken, refreshToken, profile, done) => {
			// the callback function that is called after the OAuth2 process
			try {
				// check if this user is in db
				const users = await getUsers();
				const existingUser = users.filter(
					(user) => user.googleId === profile.id
				)[0];

				// if user does not exist, add the new user to db
				if (!existingUser) {
					const newUser = {
						id: uuidv4(),
						username: profile.displayName,
						email: profile._json.email,
						googleId: profile.id,
						accessToken,
						refreshToken,
					};
					users.push(newUser);
					await saveUsers(users);

					done(null, newUser);
				} else {
					done(null, existingUser);
				}
			} catch (err) {
				done(err);
			}
		}
	)
);
