const LectureNotes = require("../../models/LectureNotes");
const getAllNotes = async (req, res) => {
  try {
    const notes = await LectureNotes.find({
      status: "completed",
    }).sort({
      createdAt: -1,
    });

    console.log("Completed Notes Count:", notes.length);
    console.log(notes);

    return res.status(200).json({
      success: true,
      data: notes,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = getAllNotes;