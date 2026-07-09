// 📄 Backend/routes/api/index.js
const express = require("express");
const router = express.Router();

const authRoutes = require("../Auth.route");
const studentRoutes = require("../student.route");
const demoClassRoutes = require("../demoClass.route");
const videoAccess = require("../videoAccess.route");

// 🌟 NEW IMPORT: Batch Routes File ko link kiya
const batchRoutes = require("../batch.route.js");

// 🛣️ Base Middleware Pipelines Setup
router.use("/auth", authRoutes);
router.use("/students", studentRoutes); // 🌟 Tumhara saara student logic /api/students par mapped hai
router.use("/demo-classes", demoClassRoutes);
router.use("/video-access", videoAccess);

// 🌟 NEW ROUTE REGISTERED: Batches ka base path set kiya
router.use("/batches", batchRoutes);

module.exports = router;
