const VideoAccess = require("../../models/VideoAccess");

const getAllVideos = async (req, res, next) => {
  try {
    const videos = await VideoAccess.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: videos });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllVideos;
