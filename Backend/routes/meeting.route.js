const express = require("express");
const router = express.Router();


// controllers
const createMeeting = require("../controllers/Meeting/createMeeting");

// ====================
// Create New Meeting
// ====================

router.post("/create",createMeeting);

module.exports = router;