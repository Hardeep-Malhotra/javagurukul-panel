const express = require("express");
const router = express.Router();

const generateNotes = require("../controllers/AINotes/generateNotes");
const getNotesByVideoId = require("../controllers/AINotes/getNotesByVideoId");

router.post("/generate", generateNotes);

router.get("/:youtubeVideoId", getNotesByVideoId);

module.exports = router;
