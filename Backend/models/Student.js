const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    batch: {
      type: String,
      required: true,
      trimL: true,
    },
    //  Account status
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    category: {
      type: String,
      enum: ["REGISTERED", "ENROLLED", "UNENROLLED", "TEMPORARY"],
      default: "REGISTERED",
    },

    enrollmentDetails: {
      courseName: {
        type: String,
        default: "",
      },
      subjects: [
        {
          type: String,
        },
      ],
      enrolledAt: { type: Date },
    },
  },
  { timestamps: true },
);
module.exports = mongoose.model("Student", studentSchema);
