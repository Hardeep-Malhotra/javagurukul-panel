const Joi = require("joi");

const sendOtpSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email address.",
    "string.empty": "Email field cannot be empty.",
  }),
});

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

const resetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
  newPassword: Joi.string().min(6).required().messages({
    "string.min": "New password must be at least 6 characters long.",
  }),
});

module.exports = {
  sendOtpSchema,
  verifyResetOtpSchema,
  resetPasswordSchema,
};
