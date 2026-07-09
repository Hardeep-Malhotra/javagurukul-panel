const mongoose = require("mongoose");

const BatchSchema = new mongoose.Schema(
  {
    batchName: {
      type: String,
      required: [true, "Batch name is required."],
      unique: true,
      trim: true,
      uppercase: true,
    },
    capacity: {
      type: Number,
      required: [true, "Batch capacity is required."],
      min: [1, "Capacity must be at least 1."],
    },
    currentStudentCount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Batch", BatchSchema);
