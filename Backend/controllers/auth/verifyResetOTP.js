const { temporaryOTPStore } = require("./otpStore");
const {
  verifyResetOtpSchema,
} = require("../../validators/forgotPasswordValidator"); // 👈 Joi Schema Import

const verifyResetOTP = async (req, res, next) => {
  try {
    // 🛡️ 1. Validate incoming body (email, otp)
    const validatedBody = await verifyResetOtpSchema.validateAsync(req.body, {
      abortEarly: false,
    });
    const { email, otp } = validatedBody;

    const record = temporaryOTPStore[email];

    // 🕵️ 2. Check if memory has this record
    if (!record) {
      const err = new Error("OTP expired or not requested for this email!");
      err.statusCode = 400;
      return next(err);
    }

    // ⏳ 3. Check Expiry
    if (Date.now() > record.expiresAt) {
      delete temporaryOTPStore[email]; // Memory clear
      const err = new Error("OTP has expired! Please request a new one.");
      err.statusCode = 400;
      return next(err);
    }

    //  4. Match OTP and Action Type
    if (record.otp !== otp || record.action !== "FORGOT_PASSWORD") {
      const err = new Error("Invalid Security OTP! Please check again.");
      err.statusCode = 400;
      return next(err);
    }

    // 🎯 5. Tag this record as verified in memory
    // Isse jab user agle page par password reset submit karega, tab hum re-verify kar payenge.
    record.isVerified = true;

    res.status(200).json({
      success: true,
      message: "OTP verified successfully! Now set your new password.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = verifyResetOTP;
