const VideoAccess = require("../../models/VideoAccess");
const Student = require("../../models/Student");
const sendEmail = require("../../utils/sendEmail");
const lectureUploadTemplate = require("../../utils/emailTemplates/lectureUploadTemplate");

const assignVideoToBatch = async (req, res, next) => {
  try {
    const { videoId, batchName } = req.body;

    if (!videoId || !batchName) {
      return res.status(400).json({
        success: false,
        message: "Video ID and Batch Name are required.",
      });
    }

    // Find Video
    const video = await VideoAccess.findById(videoId);

    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found.",
      });
    }

    // Batch already assigned?
    if (!video.assignedBatches.includes(batchName)) {
      video.assignedBatches.push(batchName);
      await video.save();
    }

    // Active Students
    const students = await Student.find({
      batch: batchName,
      status: "Active",
    });

    // Send Emails
    if (students.length > 0) {
      const emailPromises = students.map((student) => {
        const html = lectureUploadTemplate(
          student.name,
          batchName,
          video.title,
        );

        return sendEmail({
          to: student.email,
          subject: "🎥 New Lecture Uploaded - JavaGurukul",
          html,
        });
      });

      Promise.all(emailPromises).catch((err) =>
        console.error("Email Error:", err),
      );
    }

    return res.status(200).json({
      success: true,
      message: `Lecture assigned to ${batchName} successfully.`,
      data: video,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = assignVideoToBatch;
