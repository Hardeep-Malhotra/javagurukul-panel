const Joi = require("joi");

// ==========================
// Create Meeting Schema
// ==========================
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

  zoomMeetingId: Joi.string().trim().required().messages({
    "string.empty": "Zoom Meeting ID is required.",
    "any.required": "Zoom Meeting ID is required.",
  }),

  zoomPasscode: Joi.string().trim().required().messages({
    "string.empty": "Zoom Passcode is required.",
    "any.required": "Zoom Passcode is required.",
  }),

  scheduledAt: Joi.date().required().messages({
    "date.base": "Please provide a valid date & time.",
    "any.required": "Scheduled date & time is required.",
  }),
}).unknown(true); // 👈 YE ADD KARO: Extra/Unknown fields reject nahi hone dega

// ==========================
// Update Meeting Schema
// ==========================
const updateMeetingSchema = Joi.object({
  title: Joi.string().trim().min(3).max(100),
  batch: Joi.string().trim(),
  teacherName: Joi.string().trim().min(2).max(50),
  zoomMeetingLink: Joi.string().uri(),
  zoomMeetingId: Joi.string().trim(),
  zoomPasscode: Joi.string().trim(),
  scheduledAt: Joi.date(),
}).unknown(true); // 👈 YE ADD KARO

module.exports = {
  createMeetingSchema,
  updateMeetingSchema,
};