// 📄 Backend/controllers/AINotes/generateNotes.js

const LectureNotes = require("../../models/LectureNotes");
const transcriptService = require("../../services/transcriptService");
const aiService = require("../../services/aiService");

/**
 * Background AI Notes Generator
 * Admin response ko block nahi karega.
 */
const generateAiNotesBackground = async (
  youtubeVideoId,
  videoTitle,
  youtubeUrl,
) => {
  let notesDocument;

  try {
    // Check if notes already exist
    const existingNotes = await LectureNotes.findOne({
      youtubeVideoId,
    });

    if (existingNotes) {
      console.log(`[AI Engine] Notes already exist for ${youtubeVideoId}`);
      return;
    }

    // Create initial document (or reuse if already exists)
    notesDocument = await LectureNotes.findOneAndUpdate(
      { youtubeVideoId },
      {
        $setOnInsert: {
          youtubeVideoId,
          videoTitle,
          youtubeUrl,
          transcript: "Fetching transcript...",
          shortSummary: "Generating summary...",
          detailedNotes: "Generating detailed notes...",
          keyPoints: [],
          importantDefinitions: [],
          aiModel: process.env.OLLAMA_MODEL || "gemma3:4b",
          status: "processing",
        },
      },
      {
        upsert: true,
        new: true,
      },
    );
    console.log("Created/Found Notes ID:", notesDocument._id);

    console.log(`[AI Engine] Processing started for ${youtubeVideoId}`);

    // Fetch transcript
    const { transcript } = await transcriptService.getTranscript(youtubeUrl);

    if (!transcript || transcript.trim() === "") {
      throw new Error("Transcript not found.");
    }

    // Generate AI Notes
    const aiData = await aiService.generateNotesFromTranscript(transcript);

    // Update database directly
    await LectureNotes.findOneAndUpdate(
      { youtubeVideoId },
      {
        transcript,
        shortSummary: aiData.shortSummary,
        detailedNotes: aiData.detailedNotes,
        keyPoints: aiData.keyPoints || [],
        importantDefinitions: aiData.importantDefinitions || [],
        aiModel: aiData.aiModel,
        status: "completed",
        errorMessage: "",
      },
    );
    console.log(
      `[AI Engine] Notes generated successfully for ${youtubeVideoId}`,
    );
  } catch (error) {
    console.error(`[AI Engine Error] ${youtubeVideoId}:`, error.message);

    if (notesDocument) {
      await LectureNotes.findOneAndUpdate(
        { youtubeVideoId },
        {
          status: "failed",
          errorMessage: error.message,
        },
      );
    }
  }
};

module.exports = {
  generateAiNotesBackground,
};
