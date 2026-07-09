// 📄 Backend/controllers/batch/getAllBatches.js
const Batch = require("../../models/Batch");

const getAllBatches = async (req, res, next) => {
  try {
    const batches = await Batch.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: batches });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllBatches;
