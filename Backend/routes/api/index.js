const express = require("express");
const router = express.Router();

const authRoutes = require("../Auth.route");
const studentRoutes = require("../student.route");
const demoClassRoutes = require("../demoClass.route");

// 🛣️ Base Middleware Pipelines Setup
router.use("/auth", authRoutes);
router.use("/students", studentRoutes);
router.use("/demo-classes", demoClassRoutes);
module.exports = router;
