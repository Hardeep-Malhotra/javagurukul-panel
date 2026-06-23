const Student = require("../../models/Student");

const deleteStudent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const student = await Student.findByIdAndDelete(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student deleted permanently",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteStudent;
