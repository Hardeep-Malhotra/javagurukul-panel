const Student = require("../../models/Student");
const { addStudentSchema } = require("../../validators/studentValidator");

const addStudent = async (req, res, next) => {
  try {
    const validatedBody = await addStudentSchema.validateAsync(req.body, {
      abortEarly: false,
    });

    const existingStudent = await Student.findOne({
      email: validatedBody.email,
    });
    if (existingStudent) {
      const err = new Error("A student with this email already exists!");
      err.statusCode = 400;
      return next(err);
    }

    const newStudent = new Student(validatedBody);
    await newStudent.save();

    res
      .status(201)
      .json({
        success: true,
        message: "Student registered successfully!",
        data: newStudent,
      });
  } catch (error) {
    next(error);
  }
};

module.exports = addStudent; // Direct function export kiya
