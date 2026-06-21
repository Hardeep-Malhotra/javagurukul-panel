const express = require("express");
const router = express.Router();

// Controllers Import
const adminLogin = require("../controllers/auth/adminLogin");
const sendAdminOTP = require("../controllers/auth/sendAdminOTP");
const verifyOTP = require("../controllers/auth/verifyOTP");
const tempRegister = require("../controllers/auth/tempRegister");

// Middleware Import
const authorizeRoles = require("../middleware/authorizeRoles.");
const authLimiter = require("../middleware/rateLimiters/authLimiter"); // 👈 Updated Separate Path

// 🔒 Guarded Admin Login Pipeline
router.post(
  "/admin-login",
  authLimiter,
  adminLogin,
  authorizeRoles("ADMIN", "SUPER_ADMIN"),
  sendAdminOTP,
);

module.exports = router;

// Other Endpoints
router.post("/verify-otp", verifyOTP);
router.post("/temp-register", tempRegister);

module.exports = router;
