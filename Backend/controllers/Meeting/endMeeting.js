const Meeting = require("../../models/Meeting");

const { endMeetingSchema } = require("../../validators/endMeetingValidator");

const endMeeting = async (req, res, next) => {
  try {
    const { error } = endMeetingSchema.validate(req.params);

    if (error) {
      return next(error);
    }

    const { meetingId } = req.params;

    const meeting = await Meeting.findById(meetingId);

    if (!meeting) {
      return res.status(404).json({
        success: false,
        message: "Meeting not found.",
      });
    }

    if (meeting.status === "ended") {
      return res.status(400).json({
        success: false,
        message: "Meeting already ended.",
      });
    }

    // End Live Class
    meeting.status = "ended";
    meeting.endTime = new Date();

    // Future AI Pipeline
    meeting.notesStatus = "processing";

    await meeting.save();

    return res.status(200).json({
      success: true,
      message: "Live Class ended successfully.",
      data: meeting,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = endMeeting;
