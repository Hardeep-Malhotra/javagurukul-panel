const sendEmail = require("./sendEmail");
const { temporaryOTPStore } = require("../controllers/auth/otpStore");
const getOTPTemplate = require("./emailTemplates/otpEmailTemplate");

/**
 * Generic OTP Generator and Sender Service (HTML Layout Supported)
 * @param {String} email - User's email address
 * @param {Object} sessionData - Data to store in memory (userId, role, etc.)
 * @param {String} subject - Custom Email Subject
 * @param {String} title - Heading inside HTML template
 * @param {String} description - Message body inside HTML template
 */
const sendOTPService = async (
  email,
  sessionData,
  subject,
  title,
  description,
) => {
  // 1. 6 Digit Random OTP Generate
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // 2. Temporary Store mein data save (5 minutes expiry)
  temporaryOTPStore[email] = {
    otp: otp,
    ...sessionData,
    expiresAt: Date.now() + 5 * 60 * 1000,
  };

  // 3. HTML Layout Generate
  const htmlContent = getOTPTemplate(otp, title, description);

  // 4. Global Mail Helper ko call
  await sendEmail({
    to: email,
    subject: subject,
    html: htmlContent,
  });

  return true;
};

module.exports = sendOTPService;
