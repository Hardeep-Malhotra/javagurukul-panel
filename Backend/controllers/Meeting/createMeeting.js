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
    const { error } = createMeetingSchema.validate(req.body, {
      abortEarly: false,
      allowUnknown: true,
    });

    if (error) {
      console.log("❌ Joi Validation Error:", error.details[0].message);
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const {
      title,
      batch,
      teacherName,
      scheduledAt,
      zoomMeetingLink,
      zoomMeetingId,
      zoomPasscode,
    } = req.body;

    // ==========================
    // Generate Unique Meeting Code
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
    // Create Meeting in DB
    // ==========================
    const meeting = await Meeting.create({
      meetingCode,
      zoomMeetingLink,
      zoomMeetingId,
      zoomPasscode,
      title,
      batch,
      teacherName,
      scheduledAt,
      status: "scheduled",
    });

    // ==========================
    // Parallel Bulk Email Dispatch
    // ==========================
    // 1. Case-insensitive Regex match to ensure no student is missed
    const students = await Student.find({
      batch: { $regex: new RegExp(`^${batch.trim()}$`, "i") },
      status: "Active",
    });

    if (students.length > 0) {
      // 2. Prepare array of sendEmail promises
      const emailPromises = students.map((student) => {
        const html = meetingScheduleTemplate({
          studentName: student.name,
          title,
          teacherName,
          batch,
          meetingCode,
          zoomMeetingId,
          zoomPasscode,
          scheduledAt,
          meetingLink: zoomMeetingLink,
        });

        return sendEmail({
          to: student.email,
          subject: `📢 Live Class Scheduled - ${title}`,
          html,
        });
      });

      // 3. Send all emails concurrently in parallel (Non-blocking)
      Promise.allSettled(emailPromises).then((results) => {
        const successfulEmails = results.filter(
          (r) => r.status === "fulfilled",
        ).length;
        console.log(
          `✉️ [Email Dispatch Summary]: Successfully sent ${successfulEmails}/${students.length} emails.`,
        );
      });
    } else {
      console.log(`⚠️ No active students found for batch: ${batch}`);
    }

    // ==========================
    // Immediate API Response
    // ==========================
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
