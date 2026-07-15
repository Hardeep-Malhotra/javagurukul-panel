const express = require("express");
const router = express.Router();

// ==============
// controllers
// ==============
const createMeeting = require("../controllers/Meeting/createMeeting");
const joinMeeting = require("../controllers/Meeting/joinMeeting");
const startMeeting = require("../controllers/Meeting/startMeeting");
const endMeeting = require("../controllers/Meeting/endMeeting");
const getAllMeetings = require("../controllers/Meeting/getAllMeetings");

// Create Meeting
router.post("/create", createMeeting);

// Join Meeting
router.post("/join", joinMeeting);

// Start Meeting
router.put("/start/:meetingId", startMeeting);

// End Meeting
router.put("/end/:meetingId", endMeeting);

// All Meetings
router.get("/all", getAllMeetings);

module.exports = router;
