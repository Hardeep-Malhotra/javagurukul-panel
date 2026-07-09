const LectureNotes = require("../../models/LectureNotes");
const transcriptService = require("../../services/transcriptService");
const aiService = require("../../services/aiService");

const generateNotes = async (req, res) => {
  try {
    const { youtubeUrl, videoTitle } = req.body;

    if (!youtubeUrl) {
      return res.status(400).json({
        success: false,
        message: "YouTube URL is required.",
      });
    }

    // Extract Transcript
    const { youtubeVideoId, transcript } =
      await transcriptService.getTranscript(youtubeUrl);

    // Cache Check
    const existingNotes = await LectureNotes.findOne({
      youtubeVideoId,
    });

    if (existingNotes) {
      return res.status(200).json({
        success: true,
        cached: true,
        data: existingNotes,
      });
    }

    // Generate AI Notes
    const aiResult = await aiService.generateNotesFromTranscript(transcript);

    // Save Notes
    const lectureNotes = await LectureNotes.create({
      youtubeVideoId,
      videoTitle,
      youtubeUrl,
      transcript,
      shortSummary: aiResult.shortSummary,
      detailedNotes: aiResult.detailedNotes,
      keyPoints: aiResult.keyPoints,
      importantDefinitions: aiResult.importantDefinitions,
      aiModel: aiResult.aiModel,
      status: "completed",
    });

    return res.status(201).json({
      success: true,
      cached: false,
      data: lectureNotes,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = generateNotes;
