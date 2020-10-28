const express = require("express");
const passport = require("passport");
const { authCheck } = require("../../middlewares/authMiddleware");
const { getUserInfo } = require("./auth.controller");

const router = express.Router();

// to authenticate and get user authorization for mentioned scopes from Google via Oauth2
router.get(
	"/google",
	passport.authenticate("google", {
		accessType: "offline",
		scope: [
			"https://www.googleapis.com/auth/userinfo.email",
			"https://www.googleapis.com/auth/userinfo.profile",
			"https://www.googleapis.com/auth/gmail.modify",
		],
	})
);

// the callback route for Google to redirect to
router.get("/google/callback", passport.authenticate("google"), (req, res) => {
	res.send("User Authenticated");
});

// to check whether the user is authenticated
router.get("/current_user", authCheck, getUserInfo);

module.exports = router;
