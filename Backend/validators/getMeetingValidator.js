const Joi = require("joi");

const getMeetingSchema = Joi.object({
  meetingId: Joi.string().trim().required().messages({
    "string.empty": "Meeting ID is required.",
    "any.required": "Meeting ID is required.",
  }),
});

module.exports = {
  getMeetingSchema,
};