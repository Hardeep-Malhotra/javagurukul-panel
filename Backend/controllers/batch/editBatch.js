const Batch = require("../../models/Batch");

const editBatch = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { batchName, capacity, status } = req.body;

    if (!batchName || !capacity) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    // Check unique name except current batch
    const exists = await Batch.findOne({
      batchName: batchName.trim().toUpperCase(),
      _id: { $ne: id },
    });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "Batch name already exists." });
    }

    const updatedBatch = await Batch.findByIdAndUpdate(
      id,
      { batchName: batchName.trim().toUpperCase(), capacity, status },
      { new: true, runValidators: true },
    );

    if (!updatedBatch) {
      return res
        .status(404)
        .json({ success: false, message: "Batch not found." });
    }

    return res
      .status(200)
      .json({
        success: true,
        data: updatedBatch,
        message: "Batch updated successfully!",
      });
  } catch (error) {
    next(error);
  }
};

module.exports = editBatch;
