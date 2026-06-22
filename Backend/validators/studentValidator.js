const Joi = require("joi");

// 1. Schema for creating a new student
const addStudentSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "string.empty": "Student name is required.",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address.",
  }),
  phone: Joi.string().min(10).max(15).required().messages({
    "string.empty": "Phone number is required.",
  }),
  address: Joi.string().allow("").optional(),
  batch: Joi.string().required(),
  status: Joi.string().valid("Active", "Inactive").default("Active"),
});

// 2. Schema for enrolling a student
const enrollStudentSchema = Joi.object({
  courseName: Joi.string().required().messages({
    "string.empty": "Course name cannot be empty during enrollment.",
  }),
  subjects: Joi.array().items(Joi.string()).min(1).required().messages({
    "array.min": "At least one subject must be assigned.",
  }),
});

module.exports = {
  addStudentSchema,
  enrollStudentSchema,
};
