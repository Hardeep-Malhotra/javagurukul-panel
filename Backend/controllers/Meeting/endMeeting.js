const Meeting = require("../../models/Meeting");

const {
  endMeetingSchema,
} = require("../../validators/endMeetingValidator");

const endMeeting = async (req, res, next) => {
  try {
    // ==========================
    // Joi Validation
    // ==========================
    const { error } = endMeetingSchema.validate(req.params);

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
    // Meeting Already Ended
    // ==========================
    if (meeting.status === "ended") {
      return res.status(400).json({
        success: false,
        message: "Meeting has already ended.",
      });
    }

    // ==========================
    // Meeting Not Started
    // ==========================
    if (meeting.status === "waiting") {
      return res.status(400).json({
        success: false,
        message: "Meeting has not started yet.",
      });
    }

    // ==========================
    // End Meeting
    // ==========================
    meeting.status = "ended";
    meeting.endTime = new Date();

    await meeting.save();

    // ==========================
    // Success Response
    // ==========================
    return res.status(200).json({
      success: true,
      message: "Meeting ended successfully.",
      data: {
        meetingId: meeting._id,
        meetingCode: meeting.meetingCode,
        title: meeting.title,
        batch: meeting.batch,
        status: meeting.status,
        startTime: meeting.startTime,
        endTime: meeting.endTime,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = endMeeting;