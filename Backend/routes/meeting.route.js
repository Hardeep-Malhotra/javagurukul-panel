const express = require("express");
const router = express.Router();

// ==============
// controllers
// ==============
const createMeeting = require("../controllers/Meeting/createMeeting");
const joinMeeting = require("../controllers/Meeting/joinMeeting");
const startMeeting = require("../controllers/Meeting/startMeeting");

// Create Meeting
router.post("/create", createMeeting);

// Join Meeting
router.post("/join", joinMeeting);

// Start Meeting
router.put("/start/:meetingId", startMeeting);
module.exports = router;
