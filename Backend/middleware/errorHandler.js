// 📄 Backend/middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
  // 1. Default status code 500 (Server Error) rakho agar pehle se set na ho
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // 2. 🔥 Joi Validation Error ko yahin par pakad lo globaly!
  if (err.isJoi) {
    statusCode = 400;
    message = err.details[0].message; // Joi ka user-friendly message nikal lo
  }

  // 3. Agar MongoDB ki Object ID kharab hai (CastError)
  if (err.name === "CastError") {
    statusCode = 400;
    message = "Resource not found. Invalid ID format!";
  }

  // 4. Client ko clean JSON response bhejo
  res.status(statusCode).json({
    success: false,
    message: message,
    // Development phase mein error stack dikhao, production mein hide kar do
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

module.exports = errorHandler;
