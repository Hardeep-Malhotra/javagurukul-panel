const express = require("express");
const router = express.Router();

// ===============================
// Controllers
// ===============================
const createMeeting = require("../controllers/Meeting/createMeeting");
const getAllMeetings = require("../controllers/Meeting/getAllMeetings");
const getMeetingById = require("../controllers/Meeting/getMeetingById");
const updateMeeting = require("../controllers/Meeting/updateMeeting");
const deleteMeeting = require("../controllers/Meeting/deleteMeeting");
const endMeeting = require("../controllers/Meeting/endMeeting");

// ===============================
// Create Live Class
// ===============================
router.post("/create", createMeeting);

// ===============================
// Get All Live Classes
// ===============================
router.get("/all", getAllMeetings);

// ===============================
// Get Live Class By Id
// ===============================
router.get("/:meetingId", getMeetingById);

// ===============================
// Update Live Class
// ===============================
router.put("/:meetingId", updateMeeting);

// ===============================
// Delete Live Class
// ===============================
router.delete("/:meetingId", deleteMeeting);

// ===============================
// End Live Class
// ===============================
router.put("/end/:meetingId", endMeeting);

module.exports = router;