const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema(
  {
    // Unique Meeting Code
    meetingCode: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },

    // Zoom Meeting Link
    zoomMeetingLink: {
      type: String,
      required: true,
      trim: true,
    },

    // Meeting Title
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // Batch Name
    batch: {
      type: String,
      required: true,
      trim: true,
    },

    // Teacher Name
    teacherName: {
      type: String,
      required: true,
      trim: true,
    },

    // Scheduled Date & Time
    scheduledAt: {
      type: Date,
      required: true,
    },

    // Meeting Status
    status: {
      type: String,
      enum: ["scheduled", "live", "ended"],
      default: "scheduled",
    },

    // Audio Recording Path (Future AI Notes)
    audioRecordingPath: {
      type: String,
      default: "",
    },

    // Speech-to-Text Transcript
    transcript: {
      type: String,
      default: "",
    },

    // Transcript Generated
    transcriptGenerated: {
      type: Boolean,
      default: false,
    },

    // AI Notes Status
    notesStatus: {
      type: String,
      enum: ["none", "processing", "completed", "failed"],
      default: "none",
    },

    // Generated Lecture Notes Reference
    associatedNotesId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LectureNotes",
      default: null,
    },

    // Meeting End Time
    endTime: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Meeting", meetingSchema);