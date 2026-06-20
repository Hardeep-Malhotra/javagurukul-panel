const express = require("express");
const router = express.Router();

// Import individuals function from each file
const adminLogin = require("../controllers/auth/adminLogin");
const verifyOTP = require("../controllers/auth/verifyOTP");
const tempRegister = require("../controllers/auth/tempRegister");

// Endpoints Mapping
router.post("/admin-login", adminLogin);
router.post("/verify-otp", verifyOTP);
router.post("/temp-register", tempRegister);

module.exports = router;
