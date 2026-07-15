const Joi = require("joi");

const joinMeetingSchema = Joi.object({
  meetingCode: Joi.string().trim().required().messages({
    "string.empty": "Meeting code is required.",
    "any.required": "Meeting code is required.",
  }),

  studentId: Joi.string().trim().required().messages({
    "string.empty": "Student ID is required.",
    "any.required": "Student ID is required.",
  }),
});

module.exports = {
  joinMeetingSchema,
};
