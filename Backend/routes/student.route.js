const express = require("express");
const router = express.Router();

// Import student controllers from individual files
const addStudent = require("../controllers/student/addStudent");
const getStudentsByCategory = require("../controllers/student/getStudentsByCategory");
const enrollStudent = require("../controllers/student/enrollStudent");
const unenrollStudent = require("../controllers/student/unenrollStudent");

// Pipeline Setup
router.post("/add", addStudent);
router.get("/tab/:category", getStudentsByCategory);
router.put("/:id/enroll", enrollStudent);
router.put("/:id/unenroll", unenrollStudent);

module.exports = router;
