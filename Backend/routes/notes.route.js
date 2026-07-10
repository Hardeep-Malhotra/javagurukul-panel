// 📄 Backend/routes/notes.route.js
const express = require("express");
const router = express.Router();

// 🌟 Controller se exact export kiya hua function nikaalo `{ generateAiNotesBackground }`
const {
  generateAiNotesBackground,
} = require("../controllers/AINotes/generateNotes");
const getNotesByVideoId = require("../controllers/AINotes/getNotesByVideoId");
const getAllNotes = require("../controllers/AINotes/getAllNotes");

// 🌟 Route handler par generateAiNotesBackground ko pass karo
router.post("/generate", generateAiNotesBackground);

router.get("/all/lectures", getAllNotes);

router.get("/:youtubeVideoId", getNotesByVideoId);
module.exports = router;
