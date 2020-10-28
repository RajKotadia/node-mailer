const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	res.json({
		message: "Node Mailer ✨",
	});
});

module.exports = router;
