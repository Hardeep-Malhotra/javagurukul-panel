const express = require("express");
const router = express.Router();

const assignVideoToBatch = require("../controllers/VideoAccess/assignVideo");
const getVideosForStudent = require("../controllers/videoAccess/getStudentVideos");
const getBatchCounts = require("../controllers/videoAccess/getBatchCounts");
const addVideo = require("../controllers/videoAccess/addVideo");
const getAllVideos = require("../controllers/videoAccess/getAllVideos");
const editVideo = require("../controllers/VideoAccess/editVideo");
const deleteVideo = require("../controllers/VideoAccess/deleteVideo");

router.post("/add-video", addVideo);
router.get("/", getAllVideos);
router.post("/assign", assignVideoToBatch);
router.get("/student-videos/:studentId", getVideosForStudent);
router.get("/batch-counts", getBatchCounts);
router.put("/edit/:videoId", editVideo);
router.delete("/delete/:videoId", deleteVideo);

module.exports = router;
