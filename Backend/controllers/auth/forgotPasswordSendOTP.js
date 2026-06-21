const User = require("../../models/User");
const sendOTPService = require("../../utils/otpService");
const { sendOtpSchema } = require("../../validators/forgotPasswordValidator");

const forgotPasswordSendOTP = async (req, res) => {
  try {
    const validateBody = await sendOtpSchema.validateAsync(req.body);

    const { email } = validateBody;

    // Check Admin exists in database yest or not
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No admin found with this email!",
      });
    }

    // Pass data to  the generic service
    await sendOTPService(
      user.email,
      { userId: user._id, action: "FORGOT_PASSWORD" },
      "JavaGurukul Panel - Password Reset Request",
      "Password Reset Security OTP",
      "You requested to reset your password. Use the secure OTP below to proceed.",
    );

    res.status(200).json({
      success: true,
      message: "Password reset OTP sent to your register email!",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = forgotPasswordSendOTP;
