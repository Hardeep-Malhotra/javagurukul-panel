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
const getMeetingById = require("../controllers/Meeting/getMeetingById");

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

// get meeting
router.get("/:meetingId", getMeetingById);
module.exports = router;
