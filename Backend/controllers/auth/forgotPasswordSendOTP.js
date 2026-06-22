// 📄 Backend/controllers/auth/forgotPasswordSendOTP.js
const User = require("../../models/User");
const temporaryOTPStore = require("./otpStore"); // 🔥 Direct Raw Import
const { sendOtpSchema } = require("../../validators/forgotPasswordValidator");
const crypto = require("crypto");
// Tumhari jo bhi email/OTP sending service hai use import karo
// const sendOTPService = require("../../utils/sendOTPService");

const forgotPasswordSendOTP = async (req, res, next) => {
  try {
    const validatedBody = await sendOtpSchema.validateAsync(req.body, {
      abortEarly: false,
    });
    // 🔥 Email ko hamesha lowercase karo matching easy karne ke liye
    const email = validatedBody.email.toLowerCase();

    // Find user in Database
    const user = await User.findOne({ email });
    if (!user) {
      const err = new Error("No admin account found with this email address!");
      err.statusCode = 404;
      return next(err);
    }

    // Generate a secure 6-digit numeric OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Store in global memory object with normalized lowercase email key
    temporaryOTPStore[email] = {
      userId: user._id,
      otp: otp,
      action: "FORGOT_PASSWORD",
      isVerified: false,
      expiresAt: Date.now() + 5 * 60 * 1000, // 5 Minutes expiry
    };

    // DEBUG LOG: Taaki terminal me dikhe ki sahi key par save hua hai
    console.log(`✨ [Memory Store] OTP ${otp} saved for key: ${email}`);

    // 🔥 Tumhara Email Sending Logic Yahan Chalega
    // await sendOTPService(email, otp, "Password Reset Code");

    res.status(200).json({
      success: true,
      message: "A secure reset OTP has been sent to your registered email!",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = forgotPasswordSendOTP;
