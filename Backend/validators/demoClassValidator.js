const Joi = require("joi");

const demoClassSchema = Joi.object({
  title: Joi.string().trim().min(3).required().messages({
    "string.empty": "Title is required.",
    "string.min": "Title must be at least 3 characters long.",
  }),

  description: Joi.string().trim().allow(""), // Description optional ho sakti hai

  classType: Joi.string().valid("LIVE", "RECORDED").required().messages({
    "any.only": "Class Type must be either LIVE or RECORDED.",
  }),

  // Conditional Validations
  classDate: Joi.any().when("classType", {
    is: "LIVE",
    then: Joi.date().required().messages({
      "any.required": "Class Date is required for LIVE sessions.",
    }),
    otherwise: Joi.forbidden(), // Agar RECORDED hai toh ye field nahi aani chahiye
  }),

  classTime: Joi.any().when("classType", {
    is: "LIVE",
    then: Joi.string().trim().required().messages({
      "string.empty": "Class Time is required for LIVE sessions.",
    }),
    otherwise: Joi.forbidden(),
  }),

  meetingLink: Joi.any().when("classType", {
    is: "LIVE",
    then: Joi.string().uri().required().messages({
      "string.empty": "Meeting Link is required for LIVE sessions.",
      "string.uri": "Please enter a valid Meeting URL (http/https).",
    }),
    otherwise: Joi.forbidden(),
  }),

  videoUrl: Joi.any().when("classType", {
    is: "RECORDED",
    then: Joi.string().uri().required().messages({
      "string.empty": "Video URL is required for RECORDED sessions.",
      "string.uri": "Please enter a valid Video URL (http/https).",
    }),
    otherwise: Joi.forbidden(),
  }),
});

// Middleware function jo route me pass hoga
const demoClassValidator = (req, res, next) => {
  const { error } = demoClassSchema.validate(req.body, { abortEarly: true }); // abortEarly: true se pehli error aate hi ruk jayega

  if (error) {
    error.isJoi = true;
    return next(error);
  }

  next();
};

module.exports = demoClassValidator;
