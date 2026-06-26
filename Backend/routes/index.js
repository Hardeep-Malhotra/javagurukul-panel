const express = require("express");
const router = express.Router();

const apiRoutes = require("./api/index");

router.use("/api", apiRoutes);

// 🚨 404 Handler - if no any route inside the /api
router.use("/api", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
});

// Route error handling
module.exports = router;
