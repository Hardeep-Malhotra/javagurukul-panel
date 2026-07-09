// 📄 Backend/routes/api/index.js
const express = require("express");
const router = express.Router();

const authRoutes = require("../Auth.route");
const studentRoutes = require("../student.route");
const demoClassRoutes = require("../demoClass.route");
const videoAccess = require("../videoAccess.route");
const notesRoutes = require("../notes.route.js");
const batchRoutes = require("../batch.route.js");

// 🛣️ Base Middleware Pipelines Setup
router.use("/auth", authRoutes);
router.use("/students", studentRoutes);
router.use("/demo-classes", demoClassRoutes);
router.use("/video-access", videoAccess);
router.use("/batches", batchRoutes);
router.use("/notes", notesRoutes);
module.exports = router;
