// 📄 Backend/routes/Auth.route.js
const express = require("express");
const router = express.Router();

// 📁 Core Controllers Import
const adminLogin = require("../controllers/auth/adminLogin");
const sendAdminOTP = require("../controllers/auth/sendAdminOTP");
const verifyOTP = require("../controllers/auth/verifyOTP");
const tempRegister = require("../controllers/auth/tempRegister");

// 📁 New Forgot Password Controllers Import
const forgotPasswordSendOTP = require("../controllers/auth/forgotPasswordSendOTP");
const verifyResetOTP = require("../controllers/auth/verifyResetOTP");
const resetPassword = require("../controllers/auth/resetPassword");

// 🛡️ Middleware Import
const authorizeRoles = require("../middleware/authorizeRoles.");
const authLimiter = require("../middleware/rateLimiters/authLimiter");

// ==========================================
// 🚀 AUTHENTICATION ROUTES
// ==========================================

// 🔒 Guarded Admin Login Pipeline
router.post(
  "/admin-login",
  authLimiter,
  adminLogin,
  authorizeRoles("ADMIN", "SUPER_ADMIN"),
  sendAdminOTP,
);

// 🔑 Standard OTP Verification (Normal Login Flow)
router.post("/verify-otp", verifyOTP);

// 📝 Temporary Registration (If needed)
router.post("/temp-register", tempRegister);

// ==========================================
// 🔄 FORGOT PASSWORD ROUTES
// ==========================================

// Step 1: Check Email & Send Reset OTP (Protected by rate limiter)
router.post("/forgot-password/send-otp", authLimiter, forgotPasswordSendOTP);

// Step 2: Verify Reset OTP from Memory Store
router.post("/forgot-password/verify-otp", verifyResetOTP);

// Step 3: Final Password Reset & Update in Database
router.post("/forgot-password/reset", resetPassword);

module.exports = router;
