const User = require("../../models/User");
const sendEmail = require("../../utils/sendEmail");
const bcrypt = require("bcryptjs");
const { temporaryOTPStore } = require("./otpStore");
const loginSchema = require("../../validators/loginValidator");

const adminLogin = async (req, res) => {
  try {
    await loginSchema.validateAsync(req.body);
    const { email, password } = req.body;

    // 1. Check if user exists
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    // 2. Verify Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    // 4. Generate 6 Digit Random OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // 5. Save OTP Data in Temporary File for 5mints
    temporaryOTPStore[email] = {
      otp: otp,
      userId: user._id,
      role: user.role,
      expiresAt: Date.now() + 5 * 60 * 1000,
    };

    // 6. Reusable global mail helper called here
    const emailResult = await sendEmail({
      to: user.email,
      subject: "JavaGurukul Security System - Login OTP Verification",
      text: `Hello Admin, your 6-digit secure OTP for Dashboard Login is : ${otp}.\n This OTP is confidential and valid for 5 minutes only.`,
    });

    // // 7. if email delivery fail
    // if (!emailResult.success) {
    //   return res.status(500).json({
    //     success: false,
    //     message: "Failed to send verification email. Please try again.",
    //   });
    // }

    return res.status(200).json({
      success: true,
      message: "Security OTP successfully sent to your registered email!",
      showOTPField: true,
    });
  } catch (error) {
    // if Joi validation is failed this block is run
    // if (error.isJoi && error.details) {
    //   const errorMessages = error.details.map((detail) => detail.message);

    //   return res.status(400).json({ success: false, errors: errorMessages });
    // }
    // console.error("❌ LOGIN ERROR:", error);

    next(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = adminLogin;
