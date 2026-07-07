const VideoAccess = require("../../models/VideoAccess");

const editVideo = async (req, res, next) => {
  try {
    const { videoId } = req.params;
    const { title, thumbnailUrl, description } = req.body;

    if (!title) {
      return res
        .status(400)
        .json({ success: false, message: "Title is required." });
    }

    const updatedVideo = await VideoAccess.findByIdAndUpdate(
      videoId,
      { title, thumbnailUrl, description },
      { new: true, runValidators: true },
    );

    if (!updatedVideo) {
      return res
        .status(404)
        .json({ success: false, message: "Video not found." });
    }

    return res.status(200).json({
      success: true,
      message: "Video updated successfully!",
      data: updatedVideo,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = editVideo;
