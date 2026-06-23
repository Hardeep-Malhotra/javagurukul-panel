const express = require("express");
const router = express.Router();

// Import student controllers from individual files
const addStudent = require("../controllers/student/addStudent");
const getStudentsByCategory = require("../controllers/student/getStudentsByCategory");
const enrollStudent = require("../controllers/student/enrollStudent");
const unenrollStudent = require("../controllers/student/unenrollStudent");
const updateStatus = require("../controllers/student/updateStatus");
const deleteStudent = require("../controllers/student/deleteStudent");
const { checkEmailExists } = require("../controllers/student/checkEmail");
// Pipeline Setup
router.post("/add", addStudent);
router.post("/check-email", checkEmailExists);
router.get("/tab/:category", getStudentsByCategory);
router.put("/:id/enroll", enrollStudent);
router.put("/:id/unenroll", unenrollStudent);
router.put("/:id/status", updateStatus);
router.delete("/:id", deleteStudent);

module.exports = router;
