const rateLimit = require("express-rate-limit");

const studentLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes ka window
  max: 5, // Maximum 5 login requests per IP address
  message: {
    success: false,
    message:
      "Too many login attempts from this IP. Please try again after 15 minutes.",
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = { studentLoginLimiter };
