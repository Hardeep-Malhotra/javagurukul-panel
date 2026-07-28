const express = require("express");
const router = express.Router();

// ===============================
// Controllers
// ===============================
const createMeeting = require("../controllers/Meeting/createMeeting");
const endMeeting = require("../controllers/Meeting/endMeeting");
const getAllMeetings = require("../controllers/Meeting/getAllMeetings");
const getMeetingById = require("../controllers/Meeting/getMeetingById");

// ===============================
// Create Live Class
// ===============================
router.post("/create", createMeeting);

// ===============================
// End Live Class
// ===============================
router.put("/end/:meetingId", endMeeting);

// ===============================
// Get All Live Classes
// ===============================
router.get("/all", getAllMeetings);

// ===============================
// Get Live Class By Id
// ===============================
router.get("/:meetingId", getMeetingById);

module.exports = router;
