// 📄 Backend/middlewares/rateLimiters/authLimiter.js
const rateLimit = require("express-rate-limit");

/**
 * Strict Authentication Rate Limiter Middleware
 * Purpose: Protects high-risk authentication routes (like login and register) from Brute-Force script attacks.
 */
const authLimiter = rateLimit({
  // 1. Set the strict security time window frame to 1 hour (calculated in milliseconds)

  // windowMs: 60 * 60 * 1000,
  windowMs: 10 * 1000,

  // 2. Limit each IP address to a maximum of 5 authentication requests per hour
  max: 5,

  // 3. The JSON error response sent back automatically when a user or script hits the 6th login attempt
  message: {
    success: false,
    message:
      "Too many login attempts from this IP. Please try again after an hour.",
  },

  // 4. Send modern rate limit info headers back to the frontend application for real-time tracking
  standardHeaders: true,

  // 5. Disable old legacy headers to maintain optimized and clean API response sizes
  legacyHeaders: false,
});

// Export the middleware so it can be chained inside Auth.route.js
module.exports = authLimiter;
