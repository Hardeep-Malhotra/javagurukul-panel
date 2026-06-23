const Student = require("../../models/Student");

const updateStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const student = await Student.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );

    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    res.status(200).json({ success: true, data: student });
  } catch (error) {
    next(error);
  }
};

module.exports = updateStatus;
