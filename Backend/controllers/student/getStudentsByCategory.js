const Student = require("../../models/Student");

const getStudentsByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const students = await Student.find({
      category: category.toUpperCase(),
    }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: students });
  } catch (error) {
    next(error);
  }
};

module.exports = getStudentsByCategory;
