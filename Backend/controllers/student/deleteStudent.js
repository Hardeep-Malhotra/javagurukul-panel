// 📄 Backend/controllers/student/deleteStudent.js
const Student = require("../../models/Student");
const Batch = require("../../models/Batch");

const deleteStudent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id);
    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found." });
    }

    if (student.batch) {
      await Batch.findOneAndUpdate(
        { batchName: student.batch },
        { $inc: { currentStudentsCount: -1 } },
      );
    }

    await Student.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ success: true, message: "Student removed cleanly." });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteStudent;
