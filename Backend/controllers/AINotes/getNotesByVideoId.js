const LectureNotes = require("../../models/LectureNotes");

const getNotesByVideoId = async (req, res) => {
  try {
    const { youtubeVideoId } = req.params;
    console.log("Checking existing notes for:", youtubeVideoId);
    
    const notes = await LectureNotes.findOne({
      youtubeVideoId,
    });

    if (!notes) {
      return res.status(404).json({
        success: false,
        message: "Notes not found.",
      });
    }

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

module.exports = getNotesByVideoId;
