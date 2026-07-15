const Meeting = require("../../models/Meeting");

const getAllMeeting = async (req, res, next) => {
  try {
    //Fetch All Meeting
    const meeting = await Meeting.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: meeting.length,
      data: meeting,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllMeeting;
