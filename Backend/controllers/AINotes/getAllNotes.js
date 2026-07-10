const LectureNotes = require("../../models/LectureNotes");

const getAllNotes = async (req, res) => {
  try {
    const notes = await LectureNotes.find({
      status: "completed",
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      data: notes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = getAllNotes;
