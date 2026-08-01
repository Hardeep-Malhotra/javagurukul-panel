const Meeting = require("../../models/Meeting");

const updateMeeting = async (req, res) => {
  try {
    const { meetingId } = req.params;

    const {
      title,
      batch,
      teacherName,
      scheduledAt,
      zoomMeetingLink,
      zoomMeetingId,
      zoomPasscode,
    } = req.body;

    const meeting = await Meeting.findById(meetingId);

    if (!meeting) {
      return res.status(404).json({
        success: false,
        message: "Meeting not found.",
      });
    }

    meeting.title = title;
    meeting.batch = batch;
    meeting.teacherName = teacherName;
    meeting.scheduledAt = scheduledAt;
    meeting.zoomMeetingLink = zoomMeetingLink;
    meeting.zoomMeetingId = zoomMeetingId;
    meeting.zoomPasscode = zoomPasscode;

    await meeting.save();

    return res.status(200).json({
      success: true,
      message: "Meeting updated successfully.",
      data: meeting,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to update meeting.",
    });
  }
};

module.exports = updateMeeting;