const mongoose = require("mongoose");

// ==========================================
// Participant Schema
// ==========================================
const participantSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    studentName: {
      type: String,
      required: true,
      trim: true,
    },

    joinedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

// ==========================================
// Meeting Schema
// ==========================================
const meetingSchema = new mongoose.Schema(
  {
    // Meeting Code
    meetingCode: {
      type: String,
      required: true,
      unique: true,
      index: true,
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

    // Meeting Status
    status: {
      type: String,
      enum: ["waiting", "live", "ended"],
      default: "waiting",
    },

    // Students Joined
    participants: [participantSchema],

    // Meeting Start Time
    startTime: {
      type: Date,
      default: Date.now,
    },

    // Meeting End Time
    endTime: {
      type: Date,
      default: null,
    },

    // Screen Share Status
    screenShare: {
      isActive: {
        type: Boolean,
        default: false,
      },

      startedAt: {
        type: Date,
        default: null,
      },
    },

    // Audio Recording Path
    audioRecordingPath: {
      type: String,
      default: "",
    },

    // Complete Transcript
    transcript: {
      type: String,
      default: "",
    },

    // AI Notes Status
    notesStatus: {
      type: String,
      enum: ["none", "processing", "completed", "failed"],
      default: "none",
    },

    // Reference of Generated Notes
    associatedNotesId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LectureNotes",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Meeting", meetingSchema);