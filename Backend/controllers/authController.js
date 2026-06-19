const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Login Route
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

    // 4. Generate JWT Token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    // TOKEN -> COOKIES
    res.cookie("adminToken", token, {
      httpsOnly: true,
      secure: false, // In Development (localhost) on false and  when go for Production set true
      sameSite: "lax", // Protect CSRF (Cross-Site Request Forgery) Attack
    });

    return res.status(200).json({
      success: true,
      message: "Login successful!",
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
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

// Temp Register Routes
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
