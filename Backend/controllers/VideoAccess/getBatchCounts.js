const Student = require("../../models/Student");

const getBatchCounts = async (req, res, next) => {
  try {
    // Sirf Active Students ko group karo aur unka count nikalo
    const batchData = await Student.aggregate([
      {
        $match: {
          status: "Active",
        },
      },
      {
        $group: {
          _id: "$batch", // Batch ke basis par group karo
          studentCount: {
            $sum: 1, // Har student ka count +1
          },
        },
      },
      {
        $sort: {
          _id: 1, // Batch name ke according sort
        },
      },
    ]);

    // Frontend ke liye clean response
    const formattedBatches = batchData.map((batch) => ({
      batchName: batch._id,
      count: batch.studentCount,
    }));

    return res.status(200).json({
      success: true,
      data: formattedBatches,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getBatchCounts;
