// 📄 Backend/controllers/videoAccess/addVideo.js
const VideoAccess = require("../../models/VideoAccess");
const LectureNotes = require("../../models/LectureNotes");
const { generateAiNotesBackground } = require("../AINotes/generateNotes");

// Helper function to extract YouTube Video ID from any YouTube Link
const extractYoutubeId = (url) => {
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : url;
};

const addVideo = async (req, res, next) => {
  try {
    const { videoUrl, title, description, thumbnailUrl } = req.body;

    if (!videoUrl || !title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title, Description, and Video URL are required.",
      });
    }

    const youtubeVideoId = extractYoutubeId(videoUrl);

    // 🛡️ Step A: Check if video already exists in Video library
    const existingVideo = await VideoAccess.findOne({ youtubeVideoId });
    if (existingVideo) {
      return res.status(400).json({
        success: false,
        message: "This video is already present in the library.",
      });
    }

    // 💾 Step B: Save fresh video info to library
    const newVideo = new VideoAccess({
      youtubeVideoId,
      title,
      description,
      thumbnailUrl:
        thumbnailUrl ||
        `https://img.youtube.com/vi/${youtubeVideoId}/mqdefault.jpg`,
      assignedBatches: [], // Initially empty rahega ekdum fresh layout ke mutabik
    });

    await newVideo.save();

    // 🛡️ Step C: AI Duplicate Check - Kya is unique YouTube video ke notes pehle se ban chuke hain?
    const existingNotes = await LectureNotes.findOne({ youtubeVideoId });

    if (existingNotes) {
      // Agar notes pehle se hain (chahe completed hon ya processing), toh dubara AI trigger mat karo
      return res.status(201).json({
        success: true,
        message:
          "Video added to library successfully! AI notes already exist for this layout parameters.",
        data: newVideo,
      });
    }

    /* =========================================================================
        🚀 THE ASYNC BACKGROUND PIAPELINE (CRUCIAL CORE)
        ========================================================================= */
    console.log(
      "🚀 [Admin Controller]: Triggering AI background process now...",
    );

    // Catch block attach karo taaki agar background pipeline start hote hi fate,
    // toh console par turant error dikhe!
    generateAiNotesBackground(youtubeVideoId, title, videoUrl).catch((err) => {
      console.error("❌ [Background Trigger Crash]:", err);
    });

    // 🚀 Step D: Return Immediate Success Response to Admin Panel right away!
    return res.status(201).json({
      success: true,
      message:
        "Video added to library successfully! AI Notes generation started in the background.",
      data: newVideo,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addVideo;
