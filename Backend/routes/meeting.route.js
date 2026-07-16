const express = require("express");
const router = express.Router();

// ==============
// Controllers
// ==============
const createMeeting = require("../controllers/Meeting/createMeeting");
const joinMeeting = require("../controllers/Meeting/joinMeeting");
const startMeeting = require("../controllers/Meeting/startMeeting");
const endMeeting = require("../controllers/Meeting/endMeeting");
const getAllMeetings = require("../controllers/Meeting/getAllMeetings");
const getMeetingById = require("../controllers/Meeting/getMeetingById");
const verifyMeeting = require("../controllers/meeting/verifyMeeting");

// ==========================================
// Create Meeting
// ==========================================
router.post("/create", createMeeting);

// ==========================================
// Join Meeting
// ==========================================
router.post("/join", joinMeeting);

// ==========================================
// Verify Meeting Code
// ==========================================
router.post("/verify", verifyMeeting);

// ==========================================
// Start Meeting
// ==========================================
router.put("/start/:meetingId", startMeeting);

// ==========================================
// End Meeting
// ==========================================
router.put("/end/:meetingId", endMeeting);

// ==========================================
// Get All Meetings
// ==========================================
router.get("/all", getAllMeetings);

// ==========================================
// Get Meeting By Id
// ==========================================
router.get("/:meetingId", getMeetingById);

module.exports = router;