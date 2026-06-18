const express = require("express");
const router = express.Router();
const { adminLogin, tempRegister } = require("../controllers/authController");

// Router mapped to controllers

router.post("/admin-login", adminLogin);
router.post("/temp-register", tempRegister);

module.exports = router;
