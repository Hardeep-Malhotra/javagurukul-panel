const Meeting = require("../../models/Meeting");
const Student = require("../../models/Student");
const sendEmail = require("../../utils/sendEmail");
const meetingScheduleTemplate = require("../../utils/emailTemplates/meetingScheduleTemplate");
const generateMeetingCode = require("../../utils/meetingCodeGenerator");

const { createMeetingSchema } = require("../../validators/meetingValidator");

const createMeeting = async (req, res, next) => {
  try {
    // ==========================
    // Joi Validation
    // ==========================
    const { error } = createMeetingSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    const { title, batch, teacherName, scheduledAt } = req.body;

    // ==========================
    // Generate Unique Meeting Code
    // ==========================
    let meetingCode;
    let isUnique = false;
    let attempts = 0;

    while (!isUnique && attempts < 10) {
      meetingCode = generateMeetingCode();

      const existingMeeting = await Meeting.findOne({
        meetingCode,
        status: {
          $in: ["waiting", "live"],
        },
      });

      if (!existingMeeting) {
        isUnique = true;
      }

      attempts++;
    }

    // Safety Check
    if (!isUnique) {
      return res.status(500).json({
        success: false,
        message: "Unable to generate unique meeting code. Please try again.",
      });
    }

    // ==========================
    // Create Meeting
    // ==========================
    const newMeeting = await Meeting.create({
      meetingCode,
      title,
      batch,
      teacherName,
      scheduledAt,
      status: "waiting",
    });

    // ==========================
    // Send Email To All Students
    // ==========================

    const students = await Student.find({
      batch,
      status: "Active",
    });

    const meetingLink = `http://localhost:5173/student/join-meeting?code=${meetingCode}`;

    for (const student of students) {
      const html = meetingScheduleTemplate({
        studentName: student.name,
        title,
        teacherName,
        batch,
        meetingCode,
        scheduledAt,
        meetingLink,
      });

      await sendEmail({
        to: student.email,
        subject: `📢 Live Class Scheduled - ${title}`,
        html,
      });
    }

    // ==========================
    // Success Response
    // ==========================
    return res.status(201).json({
      success: true,
      message: `Meeting created successfully. Email sent to ${students.length} students.`,
      data: {
        meetingId: newMeeting._id,
        meetingCode: newMeeting.meetingCode,
        title: newMeeting.title,
        batch: newMeeting.batch,
        teacherName: newMeeting.teacherName,
        scheduledAt: newMeeting.scheduledAt,
        status: newMeeting.status,
        createdAt: newMeeting.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createMeeting;
