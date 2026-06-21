const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const loginSchema = require("../../validators/loginValidator");
const sendOTPService = require("../../utils/otpService");

const adminLogin = async (req, res, next) => {
  try {
    // 1. Joi Validation
    await loginSchema.validateAsync(req.body, { abortEarly: false });
    const { email, password } = req.body;

    // 2. Check if user exists
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Email or Password" });
    }

    // 3. Verify Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Email or Password" });
    }

    // 4. Role Check (Make middleware for this)
    if (user.role === "USER" || user.role === "STUDENT") {
      return res
        .status(403)
        .json({ success: false, message: "Access Denied!" });
    }

    // 5. Generic HTML OTP Service Call

    await sendOTPService(
      user.email, // 1. To Email
      { userId: user._id, role: user.role, purpose: "ADMIN_LOGIN" }, // 2. Session Data
      "JavaGurukul Security System - Login OTP Verification", // 3. Subject
      "Admin Panel Authentication", // 4. HTML Title
      "You are attempting to log into the JavaGurukul Admin Dashboard. Use the secure 6-digit verification code below to authorize this login session.", // 5. HTML Description
    );

    // 6. Direct Success Response
    return res.status(200).json({
      success: true,
      message: "Security OTP successfully sent to your registered email!",
      showOTPField: true,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = adminLogin;
