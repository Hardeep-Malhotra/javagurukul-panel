// 📄 Backend/middlewares/rateLimiters/globalLimiter.js
const rateLimit = require("express-rate-limit");

/**
 * Global Rate Limiter Middleware
 * Purpose: Protects the entire application from server abuse by limiting requests per IP address.
 */
const globalLimiter = rateLimit({
  // 1. Set the time window frame to 15 minutes (calculated in milliseconds)
  windowMs: 15 * 60 * 1000,

  // 2. Maximum number of requests allowed from a single IP within the 15-minute window
  max: 100,

  // 3. The JSON response sent back automatically to the client when they cross the 100-request limit
  message: {
    success: false,
    message:
      "Too many requests from this IP. Please try again after 15 minutes.",
  },

  // 4. Send modern rate limit info headers (RateLimit-Limit, RateLimit-Remaining) back to the client
  standardHeaders: true,

  // 5. Disable old legacy headers (X-RateLimit-Limit) to keep the response clean
  legacyHeaders: false,
});

// Export the middleware so it can be applied globally in server.js
module.exports = globalLimiter;
