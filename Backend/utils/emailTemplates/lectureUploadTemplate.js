// 📄 Backend/utils/emailTemplates/lectureUploadTemplate.js

const lectureUploadTemplate = (studentName, batchName, lectureTitle) => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #f0f0f0; padding: 20px; rounded-radius: 8px;">
      <h2 style="color: #fb991d; text-align: center;">🎥 New Lecture Uploaded</h2>
      <p>Hello <b>${studentName}</b>,</p>
      <p>A new video lecture has been added to your batch <b>${batchName}</b>!</p>
      
      <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #fb991d; margin: 20px 0;">
        <p style="margin: 0; font-size: 16px; font-weight: bold;">Topic: ${lectureTitle}</p>
      </div>

      <p>Please login to your JavaGurukul student dashboard to view the study material and watch the full session.</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="http://localhost:5173/login" target="_blank" style="background-color: #fb991d; color: white; padding: 12px 25px; text-decoration: none; font-weight: bold; border-radius: 5px; display: inline-block;">Login to Dashboard</a>
      </div>

      <hr style="border: none; border-top: 1px solid #eee; margin-top: 30px;" />
      <p style="font-size: 12px; color: #777; text-align: center;">
        Best Regards,<br/>
        <b>JavaGurukul Team</b>
      </p>
    </div>
  `;
};

module.exports = lectureUploadTemplate;
