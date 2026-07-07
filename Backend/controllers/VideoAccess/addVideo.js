// 📄 Backend/controllers/videoAccess/addVideo.js
const VideoAccess = require("../../models/VideoAccess");

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
      return res
        .status(400)
        .json({
          success: false,
          message: "Title, Description, and Video URL are required.",
        });
    }

    const youtubeVideoId = extractYoutubeId(videoUrl);

    // Check if video already exists in library
    const existingVideo = await VideoAccess.findOne({ youtubeVideoId });
    if (existingVideo) {
      return res
        .status(400)
        .json({
          success: false,
          message: "This video is already present in the library.",
        });
    }

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

    return res.status(201).json({
      success: true,
      message: "Video added to library successfully!",
      data: newVideo,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addVideo;
