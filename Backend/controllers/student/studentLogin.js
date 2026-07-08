// 📄 Backend/controllers/student/studentLogin.js

const Student = require("../../models/Student");
const jwt = require("jsonwebtoken");

const studentLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required.",
      });
    }

    // 2️⃣ Find Student
    const student = await Student.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found with this email.",
      });
    }

    // 3️⃣ Check Student Status
    if (student.status !== "Active") {
      return res.status(403).json({
        success: false,
        message: "Your account is inactive. Please contact the administrator.",
      });
    }

    // 4️⃣ Password = Registered Phone Number
    if (student.phone.trim() !== password.trim()) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // 5️⃣ Generate JWT Token
    const token = jwt.sign(
      {
        id: student._id,
        email: student.email,
        batch: student.batch,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    // 6️⃣ Store Token in HTTP Only Cookie
    res.cookie("studentToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true only in production
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 Days
    });

    // 7️⃣ Success Response
    return res.status(200).json({
      success: true,
      message: `Welcome ${student.name}! Login successful.`,
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        phone: student.phone,
        batch: student.batch,
        category: student.category,
        status: student.status,
      },
    });
  } catch (error) {
    console.error("Student Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

module.exports = { studentLogin };
