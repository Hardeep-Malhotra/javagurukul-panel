// const nodemailer = require("nodemailer");
// require("dotenv").config();

// // step 1 : Making Transport for deliver mail
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // step 2 : Making a reusable function , import everyWhere for sending email
// const sendEmail = async ({ to, subject, text, html }) => {
//   try {
//     const mailOptions = {
//       from: `JavaGurukul Core System <${process.env.EMAIL_USER}>`,
//       to,
//       subject,
//       text,
//       html,
//     };

//     // send mail
//     const info = await transporter.sendMail(mailOptions);
//     console.log(`Email Sent Successfully! Message ID: ${info.messageId}`);
//     return { success: true };
//   } catch (error) {
//     console.error("Nodemailer Global Error : ", error);
//     throw new Error(`Email Service Failure : ${error.message}`);
//   }
// };

// module.exports = sendEmail;
const nodemailer = require("nodemailer");
const dns = require("node:dns");
require("dotenv").config();

// Force IPv4
dns.setDefaultResultOrder("ipv4first");

// ==========================================
// SMTP TRANSPORTER
// ==========================================

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  family: 4,

  tls: {
    rejectUnauthorized: false,
  },

  connectionTimeout: 10000,
});

// ==========================================
// SEND EMAIL
// ==========================================

const sendEmail = async ({ to, subject, text, html }) => {
  console.log("========== EMAIL DEBUG START ==========");

  console.log("EMAIL_USER:", process.env.EMAIL_USER);
  console.log("EMAIL_PASS EXISTS:", !!process.env.EMAIL_PASS);
  console.log("TO:", to);
  console.log("SUBJECT:", subject);

  try {
    console.log("📡 Attempting SMTP connection...");

    const info = await transporter.sendMail({
      from: `JavaGurukul Core System <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("✅ EMAIL SENT SUCCESSFULLY");
    console.log("Message ID:", info.messageId);

    console.log("========== EMAIL DEBUG END ==========");

    return {
      success: true,
    };
  } catch (error) {
    console.error("❌ NODEMAILER ERROR");
    console.error("Message:", error.message);
    console.error("Code:", error.code);
    console.error("Command:", error.command);
    console.error("Full Error:", error);

    console.log("========== EMAIL DEBUG END ==========");

    return {
      success: false,
      error: error.message,
    };
  }
};

module.exports = sendEmail;