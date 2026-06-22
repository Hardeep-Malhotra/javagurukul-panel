// 📄 Backend/validators/forgotPasswordValidator.js

const Joi = require("joi");

// 1. Schema for checking email before sending Reset OTP
const sendOtpSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email address.",
    "string.empty": "Email field cannot be empty.",
  }),
});

// 2. Schema for verifying OTP
const verifyResetOtpSchema = Joi.object({
  email: Joi.string().email().required(),
  otp: Joi.string()
    .length(6)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      "string.length": "Reset OTP must be 6 digits.",
      "string.pattern.base": "Reset OTP must be numeric.",
    }),
});

// 🔥 3. UPDATED: Schema for final password update (Ab yeh OTP ko block nahi karega)
const resetPasswordSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email address.",
  }),
  newPassword: Joi.string().min(6).required().messages({
    "string.min": "New password must be at least 6 characters long.",
  }),
  // 👈 Frontend se OTP aa raha hai, isliye Joi ko batana padega ki use allow kare
  otp: Joi.string().allow("").optional(),
});

module.exports = {
  sendOtpSchema,
  verifyResetOtpSchema,
  resetPasswordSchema,
};
