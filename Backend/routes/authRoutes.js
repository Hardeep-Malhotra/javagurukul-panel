const express = require("express");
const router = express.Router();
const {
  adminLogin,
  tempRegister,
  verifyOTP,
} = require("../controllers/authController");

// Router mapped to controllers

router.post("/admin-login", adminLogin);
router.post("/temp-register", tempRegister);
router.post("/verify-otp", verifyOTP);

module.exports = router;
