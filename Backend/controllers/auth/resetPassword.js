// 📄 Backend/controllers/auth/resetPassword.js
const User = require("../../models/User");
const { temporaryOTPStore } = require("./otpStore");
const {
  resetPasswordSchema,
} = require("../../validators/forgotPasswordValidator");

/**
 * Controller: resetPassword
 * Purpose: Final stage of Forgot Password. Updates the user's password in the database
 * only after a successful OTP verification.
 */
const resetPassword = async (req, res, next) => {
  try {
    // 1. Validation Check: Ensure data coming from frontend (email, newPassword) matches Joi rules
    const validatedBody = await resetPasswordSchema.validateAsync(req.body, {
      abortEarly: false,
    });
    const { email, newPassword } = validatedBody;

    // Fetch the OTP session record stored in RAM memory for this email
    const record = temporaryOTPStore[email];

    // 2. Strict Security Guard: Block users trying to bypass the OTP screen
    // Checks if the record exists, if it was verified in Step 2, and if the action is correct
    if (!record || !record.isVerified || record.action !== "FORGOT_PASSWORD") {
      const err = new Error(
        "Session expired or unauthorized access! Please verify OTP first.",
      );
      err.statusCode = 403; // 403 Forbidden = Access Denied
      return next(err); // Send error to global error handler middleware
    }

    // 3. Database Check: Find the actual Admin user using the secure userId saved inside memory
    const user = await User.findById(record.userId);
    if (!user) {
      const err = new Error("Admin profile not found in database!");
      err.statusCode = 404; // 404 Not Found
      return next(err);
    }

    // 4. Update Password: Set the new password.
    // The User schema's pre-save hook will automatically hash this password before saving.
    user.password = newPassword;
    await user.save(); // Save the new hashed password permanently in MongoDB

    // 5. Memory Cleanup: Delete the email record from RAM completely so the session/OTP cannot be reused
    delete temporaryOTPStore[email];

    // 6. Success Response: Inform frontend that password has been updated successfully
    res.status(200).json({
      success: true,
      message:
        "Password reset successful! Please login with your new password.",
    });
  } catch (error) {
    // 7. Error Catching: Forward Joi validation errors or database crashes to globalErrorHandler
    next(error);
  }
};

module.exports = resetPassword;
