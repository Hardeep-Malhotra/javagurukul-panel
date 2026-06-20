const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email address.",
    "string.empty": "Email field cannot be empty.",
    "any.required": "Email is a required field.",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters long.",
    "string.empty": "Password field cannot be empty.",
    "any.required": "Password is a required field.",
  }),
});

// Default export single schema ke liye
module.exports = loginSchema;
