const rateLimit = require("express-rate-limit");

const authLimiter = rateLimit({
  windowMs: 10 * 1000, // 10 seconds
  max: 5,

  message: {
    success: false,
    message: "Too many login attempts. Please try again later.",
  },

  standardHeaders: true,
  legacyHeaders: false,

  // Trust proxy friendly key generator
  keyGenerator: (req) => {
    return req.ip;
  },
});

module.exports = authLimiter;