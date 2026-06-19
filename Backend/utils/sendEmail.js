const nodemailer = require("nodemailer");
require("dotenv").config();

// step 1 : Making Transport for deliver mail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "hardeepmalhotra022@gmail.com",
    pass: "sbktgyysyqviqdxz",
  },
});

// step 2 : Making a reusable function , import everyWhere for sending email
const sendEmail = async ({ to, subject, text }) => {
  try {
    const mailOptions = {
      from: `JavaGurukul Core System <hardeepmalhotra022@gmail.com>`,
      to,
      subject,
      text,
    };

    // send mail
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email Sent Successfully! Message ID: ${info.messageId}`);
    return { success: true };
  } catch (error) {
    console.error("Nodemailer Global Error : ", error);
    return { success: false, error: error.message };
  }
};

module.exports = sendEmail;
