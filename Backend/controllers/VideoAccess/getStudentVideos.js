const VideoAccess = require("../../models/VideoAccess");
const Student = require("../../models/Student");

const getVideosForStudent = async (req, res, next) => {
  try {
    const { studentId } = req.params;

    const student = await Student.findById(studentId);
    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found." });
    }

    // Student ke paas jitne bhi batches hain, un sabhi ki videos fetch karo ($in operator se)
    const videos = await VideoAccess.find({
      assignedBatches: { $in: student.batch },
    }).sort({ createdAt: -1 });

    return res.status(200).json({ success: true, data: videos });
  } catch (error) {
    next(error);
  }
};

module.exports = getVideosForStudent;
