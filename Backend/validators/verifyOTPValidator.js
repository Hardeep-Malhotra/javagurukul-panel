const Joi = require("joi");

const verifyOTPSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email address.",
    "string.empty": "Email field cannot be empty.",
    "any.required": "Email is a required field.",
  }),
  otp: Joi.string()
    .length(6)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      "string.length": "OTP must be exactly 6 digits long.",
      "string.pattern.base": "OTP must contain numbers only.",
      "string.empty": "OTP field cannot be empty.",
      "any.required": "OTP is a required field.",
    }),
});

module.exports = verifyOTPSchema;
