const express = require("express");
const router = express.Router();

const authRoutes = require("../Auth.route");
const studentRoutes = require("../student.route");

// 🛣️ Base Middleware Pipelines Setup
router.use("/auth", authRoutes);
router.use("/students", studentRoutes);

module.exports = router;
