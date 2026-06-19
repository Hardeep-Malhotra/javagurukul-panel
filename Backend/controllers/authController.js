const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

// Temporary Memory Store (When server is runing , OTP save here)
let temporaryOTPStore = {};

// ===== MODULE 1: LOGIN CHECK & SEND OTP =====
exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Safety Check: is email and password not given by postman
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide both email and password",
      });
    }

    // 1. Check if user exists
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    // Safety Check:  if in DB user exits but no password
    if (!user.password) {
      return res.status(500).json({
        success: false,
        message: "Server Error",
        error:
          "User password is not defined in the database. Please re-register this user.",
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

    // 3. RBAC CHECK: If role USER ya STUDENT, then block
    if (user.role === "USER" || user.role === "STUDENT") {
      return res.status(403).json({
        success: false,
        message:
          "Access Denied! You do not have permission to access the Admin Panel.",
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

    // 7. if email delivery fail
    if (!emailResult.success) {
      return res.status(500).json({
        success: false,
        message: "Failed to send verification email. Please try again.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Security OTP successfully sent to your registered email!",
      showOTPField: true,
    });
  } catch (error) {
    console.error("❌ LOGIN ERROR:", error); // Taaki terminal me dikhe
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// ===== MODULE 2: VERIFY OTP & GRANT ACCESS =====
exports.verifyOTP = async (req, res) => {
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

// ===== MODULE 3: Temp Register =====
exports.tempRegister = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    console.log("Incoming Data:", req.body); // Ye check karne ke liye ki data aa raha hai ya nahi

    let userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashPassword,
      role: role || "USER",
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "User Created!",
    });
  } catch (error) {
    // 1. Ye line aapko VS Code terminal mein asli sach bataegi
    console.error("❌ REGISTER FUNCTION CRASHED:", error);

    // 2. Ye line Postman/Frontend mein error ka reason bhej degi
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message, // <-- Isse pata chalega exact dikkat kya hai
    });
  }
};
