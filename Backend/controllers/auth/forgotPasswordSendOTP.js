const User = require("../../models/User");
const temporaryOTPStore = require("./otpStore");
const { sendOtpSchema } = require("../../validators/forgotPasswordValidator");
const crypto = require("crypto");
const sendEmail = require("../../utils/sendEmail");

const forgotPasswordSendOTP = async (req, res, next) => {
  try {
    const validatedBody = await sendOtpSchema.validateAsync(req.body, {
      abortEarly: false,
    });
    const email = validatedBody.email.toLowerCase().trim();

    // 1. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      const err = new Error("No admin account found with this email address!");
      err.statusCode = 404;
      return next(err);
    }

    // 2. Generate 6-digit numeric OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // 3. Store in global memory object
    temporaryOTPStore[email] = {
      userId: user._id,
      otp: otp,
      action: "FORGOT_PASSWORD",
      isVerified: false,
      expiresAt: Date.now() + 5 * 60 * 1000, // 5 Minutes expiry
    };

    console.log(`✨ [Memory Store] OTP ${otp} saved for key: ${email}`);

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; border: 1px solid #eee;">
        <h2 style="color: #2f8dae;">JavaGurukul Panel - Password Reset</h2>
        <p>Hello Admin,</p>
        <p>You requested a password reset for your administrator account. Use the secure 6-digit verification code below to proceed:</p>
        <div style="background: #f4f4f4; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #333; margin: 20px 0; border-radius: 8px;">
          ${otp}
        </div>
        <p style="color: #666; font-size: 12px;">This code is strictly valid for 5 minutes. If you did not request this, please ignore this email securely.</p>
      </div>
    `;

    await sendEmail({
      to: email,
      subject: "🔒 Security Alert: Admin Password Reset OTP",
      html: htmlContent,
    });

    console.log(`📩 OTP Email dispatched successfully to: ${email}`);

    res.status(200).json({
      success: true,
      message: "A secure reset OTP has been sent to your registered email!",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = forgotPasswordSendOTP;
