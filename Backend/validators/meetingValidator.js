const Joi = require("joi");

const createMeetingSchema = Joi.object({
  title: Joi.string().trim().min(3).max(100).required().messages({
    "string.empty": "Meeting title is required.",
    "string.min": "Meeting title must be at least 3 characters.",
    "string.max": "Meeting title cannot exceed 100 characters.",
    "any.required": "Meeting title is required.",
  }),

  batch: Joi.string().trim().required().messages({
    "string.empty": "Batch is required.",
    "any.required": "Batch is required.",
  }),

  teacherName: Joi.string().trim().min(2).max(50).required().messages({
    "string.empty": "Teacher name is required.",
    "string.min": "Teacher name must be at least 2 characters.",
    "string.max": "Teacher name cannot exceed 50 characters.",
    "any.required": "Teacher name is required.",
  }),

  zoomMeetingLink: Joi.string().uri().required().messages({
    "string.empty": "Zoom Meeting Link is required.",
    "string.uri": "Please enter a valid Zoom Meeting Link.",
    "any.required": "Zoom Meeting Link is required.",
  }),

  scheduledAt: Joi.date().required().messages({
    "any.required": "Scheduled date & time is required.",
  }),
});

module.exports = {
  createMeetingSchema,
};
