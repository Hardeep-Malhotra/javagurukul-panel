const Meeting = require("../../models/Meeting");
const Student = require("../../models/Student");

const { joinMeetingSchema } = require("../../validators/joinMeetingValidator");

const joinMeeting = async (req, res, next) => {
  try {
    // ==========================
    // Joi Validation
    // ==========================
    const { error } = joinMeetingSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    const { meetingCode, studentId } = req.body;

    // ==========================
    // Check Student
    // ==========================
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found.",
      });
    }

    // ==========================
    // Check Meeting
    // ==========================
    const meeting = await Meeting.findOne({
      meetingCode,
    });

    if (!meeting) {
      return res.status(404).json({
        success: false,
        message: "Meeting not found.",
      });
    }

    // ==========================
    // Check Meeting Status
    // ==========================
    if (!["waiting", "live"].includes(meeting.status)) {
      return res.status(400).json({
        success: false,
        message: "Meeting has already ended.",
      });
    }

    // ==========================
    // Check Student Batch
    // ==========================
    if (student.batch !== meeting.batch) {
      return res.status(403).json({
        success: false,
        message: "You are not assigned to this meeting batch.",
      });
    }

    // ==========================
    // Already Joined?
    // ==========================
    const alreadyJoined = meeting.participants.some(
      (participant) =>
        participant.studentId.toString() === student._id.toString(),
    );
    if (alreadyJoined) {
      return res.status(200).json({
        success: true,
        message: "Student already in meeting.",
        data: {
          meetingId: meeting._id,
          meetingCode: meeting.meetingCode,
          title: meeting.title,
          batch: meeting.batch,
          studentName: student.name,
          status: meeting.status,
        },
      });
    }

    // ==========================
    // Join Meeting
    // ==========================
    meeting.participants.push({
      studentId: student._id,
      studentName: student.name,
      joinedAt: new Date(),
    });

    await meeting.save();

    // ==========================
    // Success Response
    // ==========================
    return res.status(200).json({
      success: true,
      message: "Meeting joined successfully.",
      data: {
        meetingId: meeting._id,
        meetingCode: meeting.meetingCode,
        title: meeting.title,
        batch: meeting.batch,
        studentName: student.name,
        status: meeting.status,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = joinMeeting;
