// 📄 Backend/controllers/auth/verifyResetOTP.js
const temporaryOTPStore = require("./otpStore"); // 🔥 Direct Raw Import
const {
  verifyResetOtpSchema,
} = require("../../validators/forgotPasswordValidator");

const verifyResetOTP = async (req, res, next) => {
  try {
    const validatedBody = await verifyResetOtpSchema.validateAsync(req.body, {
      abortEarly: false,
    });
    // 🔥 Normalize email to lowercase
    const email = validatedBody.email.toLowerCase();
    const { otp } = validatedBody;

    // DEBUG LOG: Console me check karo kya data memory me exist karta hai
    console.log("🔍 [Memory Lookup] Checking key:", email);
    console.log("📦 [Memory Content]:", temporaryOTPStore);

    const record = temporaryOTPStore[email];

    // 🕵️ Check if memory has this record
    if (!record) {
      const err = new Error("OTP expired or not requested for this email!");
      err.statusCode = 400;
      return next(err);
    }

    // ⏳ Check Expiry
    if (Date.now() > record.expiresAt) {
      delete temporaryOTPStore[email];
      const err = new Error("OTP has expired! Please request a new one.");
      err.statusCode = 400;
      return next(err);
    }

    // 🔒 Match OTP (Trim space and string conversion)
    if (
      String(record.otp).trim() !== String(otp).trim() ||
      record.action !== "FORGOT_PASSWORD"
    ) {
      const err = new Error("Invalid Security OTP! Please check again.");
      err.statusCode = 400;
      return next(err);
    }

    // 🎯 Tag this record as verified in memory
    temporaryOTPStore[email].isVerified = true;

    res.status(200).json({
      success: true,
      message: "OTP verified successfully! Now set your new password.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = verifyResetOTP;
