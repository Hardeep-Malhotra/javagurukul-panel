const Student = require("../../models/Student");
const { enrollStudentSchema } = require("../../validators/studentValidator");

const enrollStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const validatedBody = await enrollStudentSchema.validateAsync(req.body, {
      abortEarly: false,
    });

    const student = await Student.findById(id);
    if (!student) {
      const err = new Error("Student record not found!");
      err.statusCode = 404;
      return next(err);
    }

    student.category = "ENROLLED";
    student.enrollmentDetails = {
      courseName: validatedBody.courseName,
      subjects: validatedBody.subjects,
      enrolledAt: new Date(),
    };

    await student.save();
    res
      .status(200)
      .json({
        success: true,
        message: "Student enrolled successfully with selected course!",
        data: student,
      });
  } catch (error) {
    next(error);
  }
};

module.exports = enrollStudent;
