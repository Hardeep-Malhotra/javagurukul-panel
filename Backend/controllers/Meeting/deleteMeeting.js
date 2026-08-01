const Meeting = require("../../models/Meeting");

const deleteMeeting = async (req, res) => {
  try {
    const { meetingId } = req.params;

    const meeting = await Meeting.findById(meetingId);

    if (!meeting) {
      return res.status(404).json({
        success: false,
        message: "Meeting not found.",
      });
    }

    await Meeting.findByIdAndDelete(meetingId);

    return res.status(200).json({
      success: true,
      message: "Meeting deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete meeting.",
    });
  }
};

module.exports = deleteMeeting;
