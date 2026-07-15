const express = require("express");
const router = express.Router();

// ==============
// controllers
// ==============
const createMeeting = require("../controllers/Meeting/createMeeting");
const joinMeeting = require("../controllers/Meeting/joinMeeting")

// Create Meeting
router.post("/create", createMeeting);

// Join Meeting
router.post("/join", joinMeeting);
module.exports = router;