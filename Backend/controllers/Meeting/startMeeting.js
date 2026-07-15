const Meeting = require("../../models/Meeting");

const {
  startMeetingSchema,
} = require("../../validators/startMeetingValidator");

const startMeeting = async (req, res, next) => {
  try {
    // ==========================
    // Joi Validation
    // ==========================
    const { error } = startMeetingSchema.validate(req.params);

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
    // Already Live
    // ==========================
    if (meeting.status === "live") {
      return res.status(400).json({
        success: false,
        message: "Meeting is already live.",
      });
    }

    // ==========================
    // Already Ended
    // ==========================
    if (meeting.status === "ended") {
      return res.status(400).json({
        success: false,
        message: "Meeting has already ended.",
      });
    }

    // ==========================
    // Start Meeting
    // ==========================
    meeting.status = "live";
    meeting.startTime = new Date();

    await meeting.save();

    // ==========================
    // Success Response
    // ==========================
    return res.status(200).json({
      success: true,
      message: "Meeting started successfully.",
      data: {
        meetingId: meeting._id,
        meetingCode: meeting.meetingCode,
        title: meeting.title,
        batch: meeting.batch,
        status: meeting.status,
        startTime: meeting.startTime,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = startMeeting;
