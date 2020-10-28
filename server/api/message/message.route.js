const express = require("express");
const { authCheck } = require("../../middlewares/authMiddleware");
const { sendMessage } = require("./message.controller");

const router = express.Router();

// @route    POST /api/message/send
// @desc     send email to a specified user
// @access   Protected
router.post("/send", authCheck, sendMessage);

module.exports = router;
