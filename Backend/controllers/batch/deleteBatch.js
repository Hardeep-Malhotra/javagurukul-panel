const Batch = require("../../models/Batch");

const deleteBatch = async (req, res, next) => {
  try {
    const { id } = req.params;

    const targetBatch = await Batch.findById(id);
    if (!targetBatch) {
      return res
        .status(404)
        .json({ success: false, message: "Batch not found." });
    }

    //  Safe Check: Agar batch me students hain toh delete mat hone do jab tak admin unhe shift na kare
    if (targetBatch.currentStudentsCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete batch. It contains ${targetBatch.currentStudentsCount} active student registries.`,
      });
    }

    await Batch.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Batch deleted cleanly from ecosystem.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteBatch;
