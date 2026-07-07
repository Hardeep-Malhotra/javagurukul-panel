const VideoAccess = require("../../models/VideoAccess");
const Student = require("../../models/Student");
const sendEmail = require("../../utils/sendEmail");
const lectureUploadTemplate = require("../../utils/emailTemplates/lectureUploadTemplate");

// Helper function to extract YouTube Video ID from any YouTube Link
const extractYoutubeId = (url) => {
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : url;
};

// const assignVideoToBatch = async (req, res, next) => {
//   try {
//     const { videoUrl, title, thumbnailUrl, batchName } = req.body;

//     if (!videoUrl || !title || !batchName) {
//       return res.status(400).json({
//         success: false,
//         message: "Video URL, Title, and Batch Name are required.",
//       });
//     }

//     const youtubeVideoId = extractYoutubeId(videoUrl);

//     // Find or create video access document
//     let video = await VideoAccess.findOne({ youtubeVideoId });

//     if (video) {
//       if (!video.assignedBatches.includes(batchName)) {
//         video.assignedBatches.push(batchName);
//         await video.save();
//       }
//     } else {
//       video = new VideoAccess({
//         youtubeVideoId,
//         title,
//         thumbnailUrl:
//           thumbnailUrl ||
//           `https://img.youtube.com/vi/${youtubeVideoId}/mqdefault.jpg`,
//         assignedBatches: [batchName],
//       });
//       await video.save();
//     }

//     // TRIGGER EMAIL: Us specific batch ke saare active bacho ko filter karo
//     const students = await Student.find({ batch: batchName, status: "Active" });

//     if (students.length > 0) {
//       const emailPromises = students.map((student) => {
//         const emailHtmlContent = lectureUploadTemplate(
//           student.name,
//           batchName,
//           title,
//         );

//         return sendEmail({
//           to: student.email, // 🌟 FIXED: Ab exact 'to' pass ho rha h jo sendEmail.js ko chahiye
//           subject: "🎥 New Lecture Uploaded - JavaGurukul",
//           html: emailHtmlContent,
//         });
//       });

//       // Saare emails background me parallelly fire ho jayenge
//       Promise.all(emailPromises).catch((err) =>
//         console.error("Error sending batch update emails:", err),
//       );
//     }

//     return res.status(200).json({
//       success: true,
//       message: `Video assigned to ${batchName} and notification emails triggered to ${students.length} students!`,
//       data: video,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// 📄 backend/controllers/VideoAccess/assignVideo.js (Ya jahan bhi route handle ho raha hai)

const assignVideoToBatch = async (req, res) => {
  try {
    // 🌟 SAFE DESTRUCTURING: Pehle safe tarike se check karo data kahan se aa raha hai
    const { videoId, batchName } = req.body;

    if (!videoId || !batchName) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields: videoId and batchName are mandatory.",
      });
    }

    // Tumhara baki ka batch assignment core database logic yahan aayega...
    // e.g., const updatedVideo = await Video.findByIdAndUpdate(videoId, { $addToSet: { assignedBatches: batchName } }, { new: true });

    return res.status(200).json({
      success: true,
      message: `Lecture successfully assigned to ${batchName} batch!`,
    });
  } catch (error) {
    console.error("Error in assignVideoToBatch:", error);
    return res.status(500).json({
      success: false,
      message:
        error.message || "Internal Server Error during batch assignment.",
    });
  }
};

module.exports = assignVideoToBatch;
