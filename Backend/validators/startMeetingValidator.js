const Joi = require("joi");

const startMeetingSchema = Joi.object({
  meetingId: Joi.string().trim().required().messages({
    "string.empty": "Meeting ID is required.",
    "any.required": "Meeting ID is required.",
  }),
});

module.exports = {
  startMeetingSchema,
};
