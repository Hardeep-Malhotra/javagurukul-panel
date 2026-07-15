
const Meeting = require("../../models/Meeting");
const generateMeetingCode = require("../../utils/meetingCodeGenerator");

const {
  createMeetingSchema,
} = require("../../validators/meetingValidator");

const createMeeting = async (req, res, next) => {
  try {
    // ==========================
    // Joi Validation
    // ==========================
    const { error } = createMeetingSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    const { title, batch, teacherName } = req.body;

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
      status: "waiting",
    });

    // ==========================
    // Success Response
    // ==========================
    return res.status(201).json({
      success: true,
      message: "Meeting created successfully.",
      data: {
        meetingId: newMeeting._id,
        meetingCode: newMeeting.meetingCode,
        title: newMeeting.title,
        batch: newMeeting.batch,
        teacherName: newMeeting.teacherName,
        status: newMeeting.status,
        createdAt: newMeeting.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createMeeting;