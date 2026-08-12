// // 📄 Backend/controllers/auth/adminLogin.js
// const User = require("../../models/User");
// const bcrypt = require("bcryptjs");
// const loginSchema = require("../../validators/loginValidator");
// const sendOTPService = require("../../utils/otpService");
// const jwt = require("jsonwebtoken");

// /**
//  * Stage 1: Validate credentials and prepare user session context
//  */
// const adminLogin = async (req, res, next) => {
//   try {
//     // 1. Joi Schema Validation
//     await loginSchema.validateAsync(req.body, { abortEarly: false });
//     const { email, password } = req.body;

//     // 2. Check if the user exists in the database
//     const user = await User.findOne({ email }).select("+password");
//     if (!user) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid Email or Password" });
//     }

//     // 3. Verify if the provided password matches the hashed password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid Email or Password" });
//     }

//     // ==========================================
//     // Demo Login
//     // ==========================================
//     if (
//       process.env.DEMO_MODE === "true" &&
//       email === process.env.DEMO_ADMIN_EMAIL
//     ) {
//       const token = jwt.sign(
//         {
//           id: user._id,
//           role: user.role,
//         },
//         process.env.JWT_SECRET,
//         {
//           expiresIn: "1d",
//         },
//       );

//       res.cookie("adminToken", token, {
//         httpOnly: true,
//         secure: false,
//         sameSite: "lax",
//       });

//       return res.status(200).json({
//         success: true,
//         message: "Demo Login Successful",
//         demo: true,
//         user: {
//           id: user._id,
//           email: user.email,
//           role: user.role,
//         },
//       });
//     }
//     // 🔗 Attach authenticated user to request pipeline for authorization guard
//     req.user = user;

//     // Move execution to authorizeRoles middleware
//     next();
//   } catch (error) {
//     next(error);
//   }
// };


// // Exporting both as a named block
// module.exports =  adminLogin; 


const nodemailer = require("nodemailer");
const dns = require("node:dns");
require("dotenv").config();

// Force IPv4 for Render network compatibility
dns.setDefaultResultOrder("ipv4first");

// Step 1: Explicit SMTP Configuration (Avoids Render IPv6/Timeout issues)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587, // Port 587 uses STARTTLS which is allowed on Render
  secure: false, // false for port 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Gmail App Password
  },
  family: 4, // Force IPv4 connection
  tls: {
    rejectUnauthorized: false,
  },
  connectionTimeout: 10000, // 10 sec timeout prevent freezing
});

// Step 2: Reusable email sender
const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const mailOptions = {
      from: `JavaGurukul Core System <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email Sent Successfully! Message ID: ${info.messageId}`);
    return { success: true };
  } catch (error) {
    console.error("Nodemailer Global Error : ", error.message);
    // Return explicit failure object so the caller controller can handle it gracefully
    return { success: false, error: error.message };
  }
};

module.exports = sendEmail;