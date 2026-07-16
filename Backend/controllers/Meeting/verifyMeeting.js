const Meeting = require("../../models/Meeting");

const verifyMeeting = async (req, res, next) => {
  try {
    const { meetingCode } = req.body;

    if (!meetingCode) {
      return res.status(400).json({
        success: false,
        message: "Meeting code is required.",
      });
    }

    const meeting = await Meeting.findOne({
      meetingCode: meetingCode.trim().toUpperCase(),
    });

    if (!meeting) {
      return res.status(404).json({
        success: false,
        message: "Meeting not found.",
      });
    }

    if (meeting.status === "ended") {
      return res.status(400).json({
        success: false,
        message: "This meeting has already ended.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Meeting verified successfully.",
      data: meeting,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = verifyMeeting;