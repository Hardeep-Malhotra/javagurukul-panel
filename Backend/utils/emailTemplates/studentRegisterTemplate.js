// 📄 Backend/utils/emailTemplates/studentRegisterTemplate.js

/**
 * Ultra-Premium JavaGurukul Student Registration HTML Email Template
 * 🌟 FIXED: Added Destructuring Braces {} in params to receive data from object fields perfectly
 */
const getStudentRegistrationTemplate = ({
  studentName,
  batchName,
  studentEmail,
  studentPhone,
}) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to JavaGurukul</title>
        <style>
            @media only screen and (max-width: 600px) {
                .container { width: 100% !important; padding: 10px !important; }
                .hero-bg { padding: 30px 20px !important; }
                .content-padding { padding: 20px !important; }
                .feature-box { width: 100% !important; display: block !important; margin-bottom: 15px !important; }
            }
        </style>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f7f9; margin: 0; padding: 0; -webkit-font-smoothing: antialiased;">

        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f4f7f9; padding: 30px 0;">
            <tr>
                <td align="center">
                    <table class="container" role="presentation" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; box-shadow: 0 10px 30px rgba(20, 33, 42, 0.05); overflow: hidden; border: 1px solid #eef2f5;" cellspacing="0" cellpadding="0" border="0">
                        
                        <tr>
                            <td style="background: linear-gradient(90deg, #14212a 0%, #17647e 50%, #fb991d 100%); height: 6px; line-height: 6px; font-size: 0;">&nbsp;</td>
                        </tr>

                        <tr>
                            <td align="center" style="padding: 30px 20px 20px 20px; background-color: #ffffff;">
                                <img src="https://res.cloudinary.com/dsc4cqkdd/image/upload/v1782110343/java-gurukul-logo_ek2ial.png" 
                                     alt="JavaGurukul Logo" 
                                     width="180" 
                                     style="max-width: 180px; height: auto; display: block; border: none; outline: none;" />
                                <div style="margin-top: 8px; color: #14212a; font-size: 20px; font-weight: 800; letter-spacing: -0.5px;">
                                    Java<span style="color: #fb991d;">Gurukul</span>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td class="hero-bg" align="center" style="background: linear-gradient(135deg, #14212a 0%, #1c3242 100%); padding: 40px 30px; text-align: center;">
                                <h1 style="color: #ffffff; margin: 0 0 10px 0; font-size: 26px; font-weight: 800; letter-spacing: -0.5px; line-height: 1.2;">
                                    Welcome to the Tribe! 🎉
                                </h1>
                                <p style="color: #b0c4de; font-size: 15px; margin: 0; line-height: 1.5; max-width: 460px;">
                                    Hello <strong>${studentName}</strong>, your premium student learning portal account has been successfully verified and activated by the administrator.
                                </p>
                            </td>
                        </tr>

                        <tr>
                            <td class="content-padding" style="padding: 40px 35px; background-color: #ffffff;">
                                
                                <h3 style="color: #14212a; font-size: 15px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 12px 0;">
                                    👤 Student Profile Summary
                                </h3>
                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f8fafc; border: 1px solid #eaf0f6; border-radius: 12px; margin-bottom: 30px; padding: 20px;">
                                    <tr>
                                        <td style="padding-bottom: 10px; font-size: 14px; color: #5d6971;"><strong>Full Name:</strong></td>
                                        <td style="padding-bottom: 10px; font-size: 14px; color: #14212a; font-weight: 600; text-align: right;">${studentName}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding-bottom: 10px; font-size: 14px; color: #5d6971;"><strong>🏫 Assigned Batch:</strong></td>
                                        <td style="padding-bottom: 10px; font-size: 14px; color: #fb991d; font-weight: 700; text-align: right;">${batchName}</td>
                                    </tr>
                                    <tr>
                                        <td style="font-size: 14px; color: #5d6971;"><strong>🟢 Account Status:</strong></td>
                                        <td style="font-size: 14px; text-align: right;">
                                            <span style="background-color: #e6f4ea; color: #137333; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 700; display: inline-block;">ACTIVE</span>
                                        </td>
                                    </tr>
                                </table>

                                <h3 style="color: #14212a; font-size: 15px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 12px 0;">
                                    🔐 Access Credentials
                                </h3>
                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background: linear-gradient(135deg, #fdfbf7 0%, #fbf5e9 100%); border: 1px solid #f5e6cd; border-radius: 12px; margin-bottom: 35px; padding: 20px;">
                                    <tr>
                                        <td style="padding-bottom: 12px; font-size: 14px; color: #5d6971;"><strong>📧 Email:</strong></td>
                                        <td style="padding-bottom: 12px; font-size: 14px; color: #14212a; font-weight: 600;">${studentEmail}</td>
                                    </tr>
                                    <tr>
                                        <td style="font-size: 14px; color: #5d6971;"><strong>📱 Default Password:</strong></td>
                                        <td style="font-size: 14px; color: #14212a; font-weight: 600;">
                                            <code>${studentPhone}</code> 
                                            <span style="color: #fb991d; font-size: 12px; display: block; margin-top: 2px; font-weight: normal; color: #a16207;">(Your Registered Phone Number)</span>
                                        </td>
                                    </tr>
                                </table>

                                <h3 style="color: #14212a; font-size: 15px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 15px 0; text-align: center;">
                                    🚀 Unlock Your Student Portal Features
                                </h3>
                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 35px;">
                                    <tr>
                                        <td class="feature-box" width="48%" style="background-color: #ffffff; border: 1px solid #eaf0f6; border-radius: 10px; padding: 15px; text-align: left; vertical-align: top;">
                                            <span style="font-size: 20px; display: block; margin-bottom: 5px;">🎥</span>
                                            <strong style="color: #14212a; font-size: 14px; display: block;">Video Lectures</strong>
                                            <span style="color: #718096; font-size: 12px; line-height: 1.4; display: block; margin-top: 3px;">High-quality recorded dashboard modules streaming exclusively for your batch code.</span>
                                        </td>
                                        <td width="4%">&nbsp;</td>
                                        <td class="feature-box" width="48%" style="background-color: #ffffff; border: 1px solid #eaf0f6; border-radius: 10px; padding: 15px; text-align: left; vertical-align: top;">
                                            <span style="font-size: 20px; display: block; margin-bottom: 5px;">📚</span>
                                            <strong style="color: #14212a; font-size: 14px; display: block;">Study Material</strong>
                                            <span style="color: #718096; font-size: 12px; line-height: 1.4; display: block; margin-top: 3px;">Instant integration to documentation files, assignments and optimized code notes.</span>
                                        </td>
                                    </tr>
                                    <tr><td style="font-size: 12px; line-height: 12px;">&nbsp;</td></tr>
                                    <tr>
                                        <td class="feature-box" width="48%" style="background-color: #ffffff; border: 1px solid #eaf0f6; border-radius: 10px; padding: 15px; text-align: left; vertical-align: top;">
                                            <span style="font-size: 20px; display: block; margin-bottom: 5px;">📢</span>
                                            <strong style="color: #14212a; font-size: 14px; display: block;">Notifications</strong>
                                            <span style="color: #718096; font-size: 12px; line-height: 1.4; display: block; margin-top: 3px;">Real-time announcements alerts tracking schedule variations instantly.</span>
                                        </td>
                                        <td width="4%">&nbsp;</td>
                                        <td class="feature-box" width="48%" style="background-color: #ffffff; border: 1px solid #eaf0f6; border-radius: 10px; padding: 15px; text-align: left; vertical-align: top;">
                                            <span style="font-size: 20px; display: block; margin-bottom: 5px;">📈</span>
                                            <strong style="color: #14212a; font-size: 14px; display: block;">Learning Progress</strong>
                                            <span style="color: #718096; font-size: 12px; line-height: 1.4; display: block; margin-top: 3px;">Track your analytical watch patterns logs to keep consistency scores high.</span>
                                        </td>
                                    </tr>
                                </table>

                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                    <tr>
                                        <td align="center">
                                            <a href="http://localhost:5173/student/login" target="_blank" style="background-color: #fb991d; color: #ffffff; padding: 14px 35px; text-decoration: none; font-weight: bold; font-size: 16px; border-radius: 8px; display: inline-block; box-shadow: 0 5px 15px rgba(251, 153, 29, 0.3); border: none; transition: background 0.2s;">
                                                Login to Student Portal 🚀
                                            </a>
                                        </td>
                                    </tr>
                                </table>

                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top: 35px; border-top: 1px dashed #e2e8f0; padding-top: 20px;">
                                    <tr>
                                        <td>
                                            <p style="margin: 0; font-size: 12px; color: #718096; line-height: 1.5; text-align: center;">
                                                🔒 <strong>Security Notice:</strong> Please keep your login credentials strictly confidential. Never share your password or portal auth data with anyone. JavaGurukul mentors will never ask for your account password keys.
                                            </p>
                                        </td>
                                    </tr>
                                </table>

                            </td>
                        </tr>

                        <tr>
                            <td style="background-color: #fbfcfd; padding: 30px 40px; text-align: center; border-top: 1px solid #eef1f4;">
                                <p style="color: #14212a; font-size: 13px; margin: 0 0 5px 0; font-weight: 700;">
                                    Need Assistance? 📞
                                </p>
                                <p style="color: #5d6971; font-size: 12px; margin: 0 0 15px 0; line-height: 1.4;">
                                    If you run into any layout breaks or face authentication failures, contact your dedicated cohort mentor or reply directly to this mail desk.
                                </p>
                                
                                <p style="color: #a0aec0; font-size: 11px; margin: 0;">
                                    &copy; ${new Date().getFullYear()} <b>JavaGurukul Panel Matrix System</b>. All rights reserved.<br/>
                                    Designed globally compatible for Gmail, Apple Mail, Outlook and all mobile viewport resolutions.
                                </p>
                            </td>
                        </tr>

                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
  `;
};

module.exports = getStudentRegistrationTemplate;
