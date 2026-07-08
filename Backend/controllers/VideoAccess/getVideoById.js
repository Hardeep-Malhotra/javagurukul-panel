const VideoAccess = require("../../models/VideoAccess");

const getVideoById = async (req, res, next) => {
  try {
    const { videoId } = req.params;

    const video = await VideoAccess.findById(videoId);

    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Requested lecture module not found.",
      });
    }

    return res.status(200).json({ success: true, data: video });
  } catch (error) {
    next(error); // Global error handler par bhej dega agar ID galat format mein hui toh
  }
};

module.exports = getVideoById;
