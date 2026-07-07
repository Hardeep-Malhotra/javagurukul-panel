const express = require("express");
const router = express.Router();
const assignVideoToBatch = require("../controllers/VideoAccess/assignVideo");
const getVideosForStudent = require("../controllers/videoAccess/getStudentVideos");

router.post("/assign", assignVideoToBatch);
router.get("/student-videos/:studentId", getVideosForStudent);

module.exports = router;
