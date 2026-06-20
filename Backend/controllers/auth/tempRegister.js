const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const { tempRegister } = require("../authController");

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

module.exports = tempRegister;
