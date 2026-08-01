const Meeting = require("../../models/Meeting");
const Student = require("../../models/Student");
const sendEmail = require("../../utils/sendEmail");
const meetingScheduleTemplate = require("../../utils/emailTemplates/meetingScheduleTemplate");

const updateMeeting = async (req, res, next) => {
  try {
    const { meetingId } = req.params;

    const updatedMeeting = await Meeting.findByIdAndUpdate(
      meetingId,
      req.body,
      { new: true }
    );

    if (!updatedMeeting) {
      return res.status(404).json({ success: false, message: "Meeting not found" });
    }

    // 📩 Send Email to new batch students on Update/Edit
    const students = await Student.find({
      batch: { $regex: new RegExp(`^${updatedMeeting.batch.trim()}$`, "i") },
      status: "Active",
    });

    if (students.length > 0) {
      const emailPromises = students.map((student) => {
        const html = meetingScheduleTemplate({
          studentName: student.name,
          title: updatedMeeting.title,
          teacherName: updatedMeeting.teacherName,
          batch: updatedMeeting.batch,
          meetingCode: updatedMeeting.meetingCode,
          zoomMeetingId: updatedMeeting.zoomMeetingId,
          zoomPasscode: updatedMeeting.zoomPasscode,
          scheduledAt: updatedMeeting.scheduledAt,
          meetingLink: updatedMeeting.zoomMeetingLink,
        });

        return sendEmail({
          to: student.email,
          subject: `📢 Live Class Updated/Scheduled - ${updatedMeeting.title}`,
          html,
        });
      });

      Promise.allSettled(emailPromises).then((results) => {
        console.log(`✉️ Emails sent to updated batch: ${students.length}`);
      });
    }

    return res.status(200).json({
      success: true,
      message: "Live Class Updated Successfully & Email Sent.",
      data: updatedMeeting,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = updateMeeting;