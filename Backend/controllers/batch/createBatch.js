const Batch = require("../../models/Batch");

const createBatch = async (req, res, next) => {
  try {
    const { batchName, capacity } = req.body;

    if (!batchName || !capacity) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    // Checking duplication
    const exists = await Batch.findOne({
      batchName: batchName.trim().toUpperCase(),
    });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "Batch name already exists." });
    }

    const newBatch = await Batch.create({
      batchName: batchName.trim().toUpperCase(),
      capacity,
    });

    return res
      .status(201)
      .json({
        success: true,
        data: newBatch,
        message: "Batch created successfully!",
      });
  } catch (error) {
    next(error);
  }
};

module.exports = createBatch;
