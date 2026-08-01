// const Meeting = require("../../models/Meeting");
// const Student = require("../../models/Student");
// const sendEmail = require("../../utils/sendEmail");
// const meetingScheduleTemplate = require("../../utils/emailTemplates/meetingScheduleTemplate");
// const generateMeetingCode = require("../../utils/meetingCodeGenerator");

// const { createMeetingSchema } = require("../../validators/meetingValidator");

// const createMeeting = async (req, res, next) => {
//   try {
//     // ==========================
//     // Validation
//     // ==========================
//     const { error } = createMeetingSchema.validate(req.body);

//     if (error) {
//       return next(error);
//     }

//     const { title, batch, teacherName, scheduledAt, zoomMeetingLink } =
//       req.body;

//     // ==========================
//     // Generate Meeting Code
//     // ==========================
//     let meetingCode;
//     let isUnique = false;

//     while (!isUnique) {
//       meetingCode = generateMeetingCode();

//       const exists = await Meeting.findOne({ meetingCode });

//       if (!exists) {
//         isUnique = true;
//       }
//     }

//     // ==========================
//     // Create Meeting
//     // ==========================
//     const meeting = await Meeting.create({
//       meetingCode,
//       zoomMeetingLink,
//       title,
//       batch,
//       teacherName,
//       scheduledAt,
//       status: "scheduled",
//     });

//     // ==========================
//     // Send Email
//     // ==========================

//     const students = await Student.find({
//       batch,
//       status: "Active",
//     });

//     for (const student of students) {
//       const html = meetingScheduleTemplate({
//         studentName: student.name,
//         title,
//         teacherName,
//         batch,
//         meetingCode,
//         scheduledAt,
//         meetingLink: zoomMeetingLink,
//       });

//       await sendEmail({
//         to: student.email,
//         subject: `📢 Live Class Scheduled - ${title}`,
//         html,
//       });
//     }

//     return res.status(201).json({
//       success: true,
//       message: "Live Class Scheduled Successfully.",
//       data: meeting,
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// module.exports = createMeeting;
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
   const { error, value } = createMeetingSchema.validate(req.body, {
      abortEarly: false,
      allowUnknown: true, // 👈 Extra keys ignore kar dega
    });

    if (error) {
      console.log("❌ Joi Validation Error:", error.details[0].message); // 👈 Ye Terminal me print hoga!
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
      zoomMeetingId,  // 👈 Extracted
      zoomPasscode,   // 👈 Extracted
    } = req.body;

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
      zoomMeetingId, // 👈 Saved in DB
      zoomPasscode,  // 👈 Saved in DB
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
        zoomMeetingId, // 👈 Can also pass to email template if needed
        zoomPasscode,  // 👈 Can also pass to email template if needed
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
