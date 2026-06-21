const nodemailer = require("nodemailer");
require("dotenv").config();

// step 1 : Making Transport for deliver mail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// step 2 : Making a reusable function , import everyWhere for sending email
const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const mailOptions = {
      from: `JavaGurukul Core System <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    };

    // send mail
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email Sent Successfully! Message ID: ${info.messageId}`);
    return { success: true };
  } catch (error) {
    console.error("Nodemailer Global Error : ", error);
    throw new Error(`Email Service Failure : ${error.message}`);
  }
};

module.exports = sendEmail;
