const mongoose = require("mongoose");

const demoClassSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    classType: {
      type: String,
      enum: ["LIVE", "RECORDED"],
      required: [true, "Class type (LIVE or RECORDED is required"],
    },
    // Specific fields for LIVE session
    classDate: {
      type: Date,
      trim: true,
      required: [true, "LIVE Class date is required"],
    },
    classTime: {
      type: String,
      trim: true,
      required: [true, "LIVE Class date is required"],
    },
    meetingLink: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ["UPCOMING", "COMPLETED"],
      default: "UPCOMING",
    },
    // Specific field for RECORDED video
    videoUrl: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("DemoClass", demoClassSchema);
