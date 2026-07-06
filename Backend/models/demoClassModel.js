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
      required: [true, "Class type (LIVE or RECORDED) is required"],
    },

    classDate: {
      type: Date,
    },
    classTime: {
      type: String,
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

    // RECORDED video ke liye (Cloudinary link)
    videoUrl: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("DemoClass", demoClassSchema);
