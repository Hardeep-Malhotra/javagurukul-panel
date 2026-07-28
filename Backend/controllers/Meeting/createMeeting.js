const Meeting = require("../../models/Meeting");
const Student = require("../../models/Student");
const sendEmail = require("../../utils/sendEmail");
const meetingScheduleTemplate = require("../../utils/emailTemplates/meetingScheduleTemplate");
const generateMeetingCode = require("../../utils/meetingCodeGenerator");

const { createMeetingSchema } = require("../../validators/meetingValidator");

const createMeeting = async (req, res, next) => {
  try {
    // ==========================
    // Validation
    // ==========================
    const { error } = createMeetingSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    const { title, batch, teacherName, scheduledAt, zoomMeetingLink } =
      req.body;

    // ==========================
    // Generate Meeting Code
    // ==========================
    let meetingCode;
    let isUnique = false;

    while (!isUnique) {
      meetingCode = generateMeetingCode();

      const exists = await Meeting.findOne({ meetingCode });

      if (!exists) {
        isUnique = true;
      }
    }

    // ==========================
    // Create Meeting
    // ==========================
    const meeting = await Meeting.create({
      meetingCode,
      zoomMeetingLink,
      title,
      batch,
      teacherName,
      scheduledAt,
      status: "scheduled",
    });

    // ==========================
    // Send Email
    // ==========================

    const students = await Student.find({
      batch,
      status: "Active",
    });

    for (const student of students) {
      const html = meetingScheduleTemplate({
        studentName: student.name,
        title,
        teacherName,
        batch,
        meetingCode,
        scheduledAt,
        meetingLink: zoomMeetingLink,
      });

      await sendEmail({
        to: student.email,
        subject: `📢 Live Class Scheduled - ${title}`,
        html,
      });
    }

    return res.status(201).json({
      success: true,
      message: "Live Class Scheduled Successfully.",
      data: meeting,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = createMeeting;
