// 📄 Backend/controllers/auth/adminLogin.js
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const loginSchema = require("../../validators/loginValidator");
const sendOTPService = require("../../utils/otpService");

/**
 * Stage 1: Validate credentials and prepare user session context
 */
const adminLogin = async (req, res, next) => {
  try {
    // 1. Joi Schema Validation
    await loginSchema.validateAsync(req.body, { abortEarly: false });
    const { email, password } = req.body;

    // 2. Check if the user exists in the database
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Email or Password" });
    }

    // 3. Verify if the provided password matches the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Email or Password" });
    }

    // 🔗 Attach authenticated user to request pipeline for authorization guard
    req.user = user;

    // Move execution to authorizeRoles middleware
    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Stage 2: Triggered only after authorizeRoles middleware grants access
 */
const sendAdminOTP = async (req, res, next) => {
  try {
    const user = req.user; // Retrieved safely from request context

    // Trigger HTML OTP service
    await sendOTPService(
      user.email,
      { userId: user._id, role: user.role, purpose: "ADMIN_LOGIN" },
      "JavaGurukul Security System - Login OTP Verification",
      "Admin Panel Authentication",
      "You are attempting to log into the JavaGurukul Admin Dashboard. Use the secure 6-digit verification code below to authorize this login session.",
    );

    return res.status(200).json({
      success: true,
      message: "Security OTP successfully sent to your registered email!",
      showOTPField: true,
    });
  } catch (error) {
    next(error);
  }
};

// Exporting both as a named block
module.exports = adminLogin;
