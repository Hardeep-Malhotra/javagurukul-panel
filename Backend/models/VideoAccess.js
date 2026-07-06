const mongoose = require("mongoose");

const videoAccessSchema = new mongoose.Schema(
  {
    youtubeVideoId: {
      type: String,
      required: [true, "Youtube Video ID is required"],
      unique: true,
    },
    title: {
      type: String,
      required: [true, "Video Title is required"],
      trim: true,
    },
    thumbnail: {
      type: String,
    },

    assignedBatches: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("VideoAccess", videoAccessSchema);
