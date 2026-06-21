const express = require("express");
const router = express.Router();

// Controllers Import
const adminLogin = require("../controllers/auth/adminLogin");
const sendAdminOTP = require("../controllers/auth/sendAdminOTP");
const verifyOTP = require("../controllers/auth/verifyOTP");
const tempRegister = require("../controllers/auth/tempRegister");

// Middleware Import
const authorizeRoles = require("../middleware/authorizeRoles.");

// 🔒 Explicit Sequential Security Pipeline for Admin Login
router.post(
  "/admin-login",
  adminLogin, // 1. Credentials Check & Session Context Binding
  authorizeRoles("ADMIN", "SUPER_ADMIN"), // 2. Role-Based Access Control (RBAC) Guard
  sendAdminOTP, // 3. Final OTP Dispatch & Secure Response
);

// Other Endpoints
router.post("/verify-otp", verifyOTP);
router.post("/temp-register", tempRegister);

module.exports = router;
