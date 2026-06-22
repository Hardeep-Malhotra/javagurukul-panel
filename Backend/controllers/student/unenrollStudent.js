const Student = require("../../models/Student");

const unenrollStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);

    if (!student) {
      const err = new Error("Student record not found!");
      err.statusCode = 404;
      return next(err);
    }

    student.category = "UNENROLLED";
    await student.save();

    res
      .status(200)
      .json({
        success: true,
        message: "Student unenrolled safely. History preserved.",
        data: student,
      });
  } catch (error) {
    next(error);
  }
};

module.exports = unenrollStudent;
