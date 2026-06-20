const jwt = require("jsonwebtoken");
const { temporaryOTPStore } = require("./otpStore");

// ===== MODULE 2: VERIFY OTP & GRANT ACCESS =====
const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // step 1 : email session in memory store
    const storedData = temporaryOTPStore[email];

    if (!storedData) {
      return res.status(400).json({
        success: false,
        message: "OTP session not found or expired. Please login again!",
      });
    }

    // step 2: Check session expiry

    if (storedData.expiresAt < Date.now()) {
      delete temporaryOTPStore[email];
      return res.status(400).json({
        success: false,
        message: "OTP has expired! Please request a new one.",
      });
    }

    // step 3 : Check OTP Match
    if (storedData.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Incorrect OTP! Authentication failed.",
      });
    }

    // step 4 : if OTP success , Then clear the memory
    delete temporaryOTPStore[email];

    // step 8: Generate JWT TOken
    const token = jwt.sign(
      {
        id: storedData.userId,
        role: storedData.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return res.status(200).json({
      success: true,
      message: "OTP Verified! Login Successfully.",
      user: {
        id: storedData.userId,
        email: email,
        role: storedData.role,
      },
    });
  } catch (error) {
    console.error("❌ OTP VERIFICATION ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = verifyOTP;
