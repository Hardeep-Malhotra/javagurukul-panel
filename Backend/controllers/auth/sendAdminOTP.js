// const sendOTPService = require("../../utils/otpService");

// /**
//  * Stage 2 Login Handler: Dispatches secure OTP to authorized administrators
//  */
// const sendAdminOTP = async (req, res, next) => {
//   try {
//     // Safely retrieve the user object attached by the adminLogin controller
//     const user = req.user;

//     // Trigger the HTML OTP generation and mailing service
//     await sendOTPService(
//       user.email,
//       { userId: user._id, role: user.role, purpose: "ADMIN_LOGIN" },
//       "JavaGurukul Security System - Login OTP Verification",
//       "Admin Panel Authentication",
//       "You are attempting to log into the JavaGurukul Admin Dashboard. Use the secure 6-digit verification code below to authorize this login session.",
//     );

//     // Send final success response to the client
//     return res.status(200).json({
//       success: true,
//       message: "Security OTP successfully sent to your registered email!",
//       showOTPField: true,
//     });
//   } catch (error) {
//     // Forward SMTP or runtime errors to the central global error handling middleware
//     next(error);
//   }
// };

// module.exports = sendAdminOTP;
// 📄 Backend/controllers/auth/sendAdminOTP.js
const sendOTPService = require("../../utils/otpService");

/**
 * Stage 2 Login Handler: Dispatches secure OTP to authorized administrators
 */
const sendAdminOTP = async (req, res, next) => {
  try {
    const user = req.user;

    // Trigger the HTML OTP generation and mailing service
    await sendOTPService(
      user.email,
      { userId: user._id, role: user.role, purpose: "ADMIN_LOGIN" },
      "JavaGurukul Security System - Login OTP Verification",
      "Admin Panel Authentication",
      "You are attempting to log into the JavaGurukul Admin Dashboard. Use the secure 6-digit verification code below to authorize this login session.",
    );

    // Send final success response to the client
    return res.status(200).json({
      success: true,
      message: "Security OTP successfully sent to your registered email!",
      showOTPField: true,
    });
  } catch (error) {
    // Express global middleware ko raw error bhejne ke bajaye clean JSON response return karein
    return res.status(500).json({
      success: false,
      message:
        "Unable to send verification OTP via email. Please check server email service configuration.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

module.exports = sendAdminOTP;
