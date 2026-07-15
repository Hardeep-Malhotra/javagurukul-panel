const Meeting = require("../../models/Meeting");

const {
  getMeetingSchema,
} = require("../../validators/getMeetingValidator");

const getMeetingById = async (req, res, next) => {
  try {
    // ==========================
    // Joi Validation
    // ==========================
    const { error } = getMeetingSchema.validate(req.params);

    if (error) {
      return next(error);
    }

    const { meetingId } = req.params;

    // ==========================
    // Find Meeting
    // ==========================
    const meeting = await Meeting.findById(meetingId);

    if (!meeting) {
      return res.status(404).json({
        success: false,
        message: "Meeting not found.",
      });
    }

    // ==========================
    // Success Response
    // ==========================
    return res.status(200).json({
      success: true,
      data: meeting,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getMeetingById;