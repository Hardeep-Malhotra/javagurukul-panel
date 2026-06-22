const User = require("../../models/User");
const temporaryOTPStore = require("./otpStore");
const {
  resetPasswordSchema,
} = require("../../validators/forgotPasswordValidator");
const bcrypt = require("bcryptjs");

/**
 * Controller: resetPassword
 * Purpose: Final stage of Forgot Password. Manually hashes password before saving to avoid login mismatch.
 */
const resetPassword = async (req, res, next) => {
  try {
    // 1. Joi Body Validation
    const validatedBody = await resetPasswordSchema.validateAsync(req.body, {
      abortEarly: false,
    });
    const { email, newPassword } = validatedBody;

    // Normalize email key safely
    const normalizedEmail = (email || "").toLowerCase().trim();
    const record = temporaryOTPStore[normalizedEmail];

    // 2. Verification Status Check
    if (!record || record.action !== "FORGOT_PASSWORD") {
      const err = new Error(
        "Session expired or unauthorized access! Please request a new OTP.",
      );
      err.statusCode = 403;
      return next(err);
    }

    if (record.isVerified !== true) {
      const err = new Error("Security Alert: OTP has not been verified yet!");
      err.statusCode = 403;
      return next(err);
    }

    //  3. Find user in Database
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      const err = new Error("Admin profile not found in our records!");
      err.statusCode = 404;
      return next(err);
    }

    //  4. MANUAL HASHING (Bulletproof Fix for Invalid Credentials)
    // Salt generate karke plain text password ko hash mein convert kar rahe hain
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Database me direct hashed password assign kar rahe hain
    user.password = hashedPassword;
    await user.save();

    //  5. RAM memory cleanup
    delete temporaryOTPStore[normalizedEmail];

    //  6. Success Response
    return res.status(200).json({
      success: true,
      message:
        "Password reset successful! Please login with your new password.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = resetPassword;
