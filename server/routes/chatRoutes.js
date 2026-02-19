const express = require("express");
const router = express.Router();
const { sendMessage } = require("../controllers/chatController");
const crisisDetection = require("../middleware/crisisDetection");

router.post("/", crisisDetection, sendMessage);

module.exports = router;
