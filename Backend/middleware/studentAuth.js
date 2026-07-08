// 📄 Backend/middleware/studentAuth.js
const jwt = require("jsonwebtoken");

const verifyStudent = async (req, res, next) => {
  try {
    // 🌟 Cookie se token uthana
    const token = req.cookies.studentToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access Denied. Please log in first.",
      });
    }

    // Token verify karna
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // Request object ke andar student payload inject karna (id, email, batch)
    req.student = verified;

    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Invalid or expired session token. Please re-login.",
    });
  }
};

module.exports = { verifyStudent };
