const express = require("express");
const passport = require("passport");
const { clientURL } = require("../../config");
const { authCheck } = require("../../middlewares/authMiddleware");
const { getUserInfo } = require("./auth.controller");

const router = express.Router();

// @route	GET /api/auth/google
// @desc 	to authenticate and get user authorization for mentioned scopes from Google via Oauth2
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

// @route	GET /api/auth/google/callback
// @desc	the callback route for Google to redirect to
router.get(
	"/google/callback",
	passport.authenticate("google", {
		failureRedirect: `${clientURL}/?err=true`,
	}),
	(req, res) => {
		// redirects the user to /message route on client to send a new mail
		res.redirect(`${clientURL}/message.html`);
	}
);

// @route	GET /api/auth/current_user
// @desc	to check whether the user is authenticated
// @access	protected
router.get("/current_user", authCheck, getUserInfo);

module.exports = router;
