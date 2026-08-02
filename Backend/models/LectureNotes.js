const mongoose = require("mongoose");

const LectureNotesSchema = new mongoose.Schema(
  {
    // YouTube Video Details
    youtubeVideoId: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },

    videoTitle: {
      type: String,
      required: true,
      trim: true,
    },

    youtubeUrl: {
      type: String,
      required: true,
      trim: true,
    },

    // Original Transcript
    transcript: {
      type: String,
      required: true,
    },

    // AI Generated Content
    shortSummary: {
      type: String,
      required: true,
    },

    detailedNotes: {
      type: String,
      required: true,
    },

    keyPoints: [
      {
        heading: String,
        description: String,
      },
    ],

    importantDefinitions: [
      {
        term: String,
        definition: String,
      },
    ],

    // AI Information
    aiModel: {
      type: String,
      default: "gemma3:4b", 
    },

    promptVersion: {
      type: Number,
      default: 1,
    },

    // Generation Status
    status: {
      type: String,
      enum: ["processing", "completed", "failed"],
      default: "processing",
    },

    errorMessage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("LectureNotes", LectureNotesSchema);
