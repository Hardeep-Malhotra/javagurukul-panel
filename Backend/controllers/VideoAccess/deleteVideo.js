const VideoAccess = require("../../models/VideoAccess");

const deleteVideo = async (req, res, next) => {
  try {
    const { videoId } = req.params;

    const deletedVideo = await VideoAccess.findByIdAndDelete(videoId);

    if (!deletedVideo) {
      return res
        .status(404)
        .json({ success: false, message: "Video not found." });
    }

    return res.status(200).json({
      success: true,
      message: "Video deleted successfully from library!",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteVideo;
