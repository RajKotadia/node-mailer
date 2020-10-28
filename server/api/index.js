const express = require("express");
const authRoutes = require("./auth/auth.route");
const messageRoutes = require("./message/message.route");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/message", messageRoutes);

module.exports = router;
