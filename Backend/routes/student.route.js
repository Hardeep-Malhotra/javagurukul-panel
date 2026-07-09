// 📄 Backend/routes/api/student.route.js
const express = require("express");
const router = express.Router();

// 1. Import Existing Student Controllers (Admin Actions)
const addStudent = require("../controllers/student/addStudent");
const getStudentsByCategory = require("../controllers/student/getStudentsByCategory");
const enrollStudent = require("../controllers/student/enrollStudent");
const unenrollStudent = require("../controllers/student/unenrollStudent");
const updateStatus = require("../controllers/student/updateStatus");
const deleteStudent = require("../controllers/student/deleteStudent");
const { checkEmailExists } = require("../controllers/student/checkEmail");
const getVideoById = require("../controllers/VideoAccess/getVideoById");
const { verifyStudent } = require("../middleware/studentAuth");

// 2. Import New Student Portal Controllers & Middleware
const { studentLogin } = require("../controllers/student/studentLogin");
const {
  studentLoginLimiter,
} = require("../middleware/rateLimiters/studentRateLimiter");
const Video = require("../models/VideoAccess"); // Schema model mapping for videos

// ==========================================
// 🔓 STUDENT PORTAL OPEN ROUTES
// ==========================================

// 🌟 Route 1: Secure Student Login with Rate Limiting Middleware Protection
router.post("/login", studentLoginLimiter, studentLogin);

// 🌟 Route 2: Fetch Student's Assigned Batch Video Lectures Pipeline
router.get("/my-batch-videos/:batchName", verifyStudent, async (req, res) => {
  try {
    const { batchName } = req.params;

    if (!batchName) {
      return res.status(400).json({
        success: false,
        message: "Batch filter parameter is required.",
      });
    }

    // Checking if requested batch name exists inside the video assignedBatches tags
    const sharedVideos = await Video.find({ assignedBatches: batchName }).sort({
      createdAt: 1,
    });

    return res.status(200).json({
      success: true,
      data: sharedVideos,
    });
  } catch (error) {
    console.error("Error fetching student batch videos:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to pull playlist registry records.",
    });
  }
});

router.get("/video-access/:videoId", verifyStudent, getVideoById);
// ==========================================
// 🛡️ ADMIN PANEL WORKFLOW ROUTES (Existing)
// ==========================================
router.post("/add", addStudent);
router.post("/check-email", checkEmailExists);
router.get("/tab/:category", getStudentsByCategory);
router.put("/:id/enroll", enrollStudent);
router.put("/:id/unenroll", unenrollStudent);
router.put("/:id/status", updateStatus);
router.delete("/:id", deleteStudent);

module.exports = router;
