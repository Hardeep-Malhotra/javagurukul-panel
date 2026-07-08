// 📄 Backend/utils/emailTemplates/lectureUploadTemplate.js

/**
 * Premium Educational Theme HTML Email Template for Lecture Upload Notifications
 * Compatible with Gmail, Outlook, Apple Mail, and modern mobile viewports.
 * * @param {String} studentName - Name of the registered student
 * @param {String} batchName - Batch assigned to the student
 * @param {String} lectureTitle - Title of the uploaded video lecture
 */
const lectureUploadTemplate = (studentName, batchName, lectureTitle) => {
  // Extract dynamic date formatting for the upload metadata card
  const currentDate = new Date().toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Lecture Uploaded - JavaGurukul</title>
        <style>
            @media only screen and (max-width: 600px) {
                .container { width: 100% !important; padding: 10px !important; }
                .hero-bg { padding: 35px 20px !important; }
                .content-padding { padding: 25px 20px !important; }
                .feature-box { width: 100% !important; display: block !important; margin-bottom: 15px !important; }
            }
        </style>
 head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f7f9; margin: 0; padding: 0; -webkit-font-smoothing: antialiased;">

        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f4f7f9; padding: 30px 0;">
            <tr>
                <td align="center">
                    <table class="container" role="presentation" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; box-shadow: 0 10px 30px rgba(20, 33, 42, 0.05); overflow: hidden; border: 1px solid #eef2f5;" cellspacing="0" cellpadding="0" border="0">
                        
                        <tr>
                            <td style="background: linear-gradient(90deg, #14212a 0%, #fb991d 50%, #17647e 100%); height: 6px; line-height: 6px; font-size: 0;">&nbsp;</td>
                        </tr>

                        <tr>
                            <td align="center" style="padding: 30px 20px 20px 20px; background-color: #ffffff;">
                                <img src="https://res.cloudinary.com/dsc4cqkdd/image/upload/v1782110343/java-gurukul-logo_ek2ial.png" 
                                     alt="JavaGurukul Logo" 
                                     width="180" 
                                     style="max-width: 180px; height: auto; display: block; border: none; outline: none;" />
                                <div style="margin-top: 6px; color: #14212a; font-size: 19px; font-weight: 800; letter-spacing: -0.5px;">
                                    Java<span style="color: #fb991d;">Gurukul</span>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td class="hero-bg" align="center" style="background: linear-gradient(135deg, #14212a 0%, #1c3242 100%); padding: 40px 30px; text-align: center;">
                                <span style="font-size: 32px; display: block; margin-bottom: 10px;">🎥</span>
                                <h1 style="color: #ffffff; margin: 0 0 8px 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; line-height: 1.3;">
                                    New Lecture Uploaded
                                </h1>
                                <p style="color: #fb991d; font-size: 15px; margin: 0; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase;">
                                    Keep Learning & Keep Growing 🚀
                                </p>
                            </td>
                        </tr>

                        <tr>
                            <td class="content-padding" style="padding: 40px 35px; background-color: #ffffff;">
                                
                                <p style="color: #14212a; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                                    Hello <strong>${studentName}</strong>,
                                </p>
                                <p style="color: #5d6971; font-size: 14.5px; line-height: 1.6; margin: 0 0 25px 0;">
                                    A fresh learning module has just been uploaded to your active academic profile routing dashboard. Grab your notes and jump straight into the logical walkthrough session!
                                </p>

                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f8fafc; border: 1px solid #eaf0f6; border-radius: 12px; margin-bottom: 30px; padding: 22px;">
                                    <tr>
                                        <td colspan="2" style="padding-bottom: 15px; border-b: 1px solid #e2e8f0;">
                                            <span style="background-color: #fff4e6; color: #c2700f; padding: 4px 12px; border-radius: 6px; font-size: 11px; font-weight: 700; display: inline-block; letter-spacing: 0.5px; uppercase tracking-wider;">🔥 NEW LECTURE</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 12px 0 6px 0; font-size: 13px; color: #718096; vertical-align: top;" width="30%"><strong>Lecture Title:</strong></td>
                                        <td style="padding: 12px 0 6px 0; font-size: 14.5px; color: #14212a; font-weight: 700; vertical-align: top; line-height: 1.4;">${lectureTitle}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 6px 0; font-size: 13px; color: #718096; vertical-align: top;"><strong>Assigned Batch:</strong></td>
                                        <td style="padding: 6px 0; font-size: 14px; color: #17647e; font-weight: 600; vertical-align: top;">${batchName}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 6px 0 0 0; font-size: 13px; color: #718096; vertical-align: top;"><strong>Upload Date:</strong></td>
                                        <td style="padding: 6px 0 0 0; font-size: 14px; color: #14212a; font-weight: 500; vertical-align: top;">${currentDate}</td>
                                    </tr>
                                </table>

                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 30px 0 35px 0;">
                                    <tr>
                                        <td align="center">
                                            <a href="http://localhost:5173/student/login" target="_blank" style="background-color: #fb991d; color: #ffffff; padding: 14px 35px; text-decoration: none; font-weight: bold; font-size: 15px; border-radius: 8px; display: inline-block; box-shadow: 0 5px 15px rgba(251, 153, 29, 0.3); transition: all 0.2s; border: none;">
                                                Watch Lecture Now 🚀
                                            </a>
                                        </td>
                                    </tr>
                                </table>

                                <div style="border-top: 1px solid #eef1f4; margin-top: 30px; padding-top: 30px;">
                                    <h3 style="color: #14212a; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 20px 0; text-align: center;">
                                        🚀 Maximize Your Learning Ecosystem
                                </h3>
                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 25px;">
                                    <tr>
                                        <td class="feature-box" width="48%" style="background-color: #fbfcfd; border: 1px solid #eaf0f6; border-radius: 10px; padding: 15px; text-align: left; vertical-align: top;">
                                            <span style="font-size: 18px; display: block; margin-bottom: 4px;">🎥</span>
                                            <strong style="color: #14212a; font-size: 13.5px; display: block;">Watch HD Video Lectures</strong>
                                            <span style="color: #718096; font-size: 11.5px; line-height: 1.4; display: block; margin-top: 3px;">High definition video playback with interactive timestamp routing metrics.</span>
                                        </td>
                                        <td width="4%">&nbsp;</td>
                                        <td class="feature-box" width="48%" style="background-color: #fbfcfd; border: 1px solid #eaf0f6; border-radius: 10px; padding: 15px; text-align: left; vertical-align: top;">
                                            <span style="font-size: 18px; display: block; margin-bottom: 4px;">📚</span>
                                            <strong style="color: #14212a; font-size: 13.5px; display: block;">Study Material</strong>
                                            <span style="color: #718096; font-size: 11.5px; line-height: 1.4; display: block; margin-top: 3px;">Instant file downloads, source code templates, and assignment roadmaps.</span>
                                        </td>
                                    </tr>
                                    <tr><td style="font-size: 10px; line-height: 10px;">&nbsp;</td></tr>
                                    <tr>
                                        <td class="feature-box" width="48%" style="background-color: #fbfcfd; border: 1px solid #eaf0f6; border-radius: 10px; padding: 15px; text-align: left; vertical-align: top;">
                                            <span style="font-size: 18px; display: block; margin-bottom: 4px;">📢</span>
                                            <strong style="color: #14212a; font-size: 13.5px; display: block;">Latest Announcements</strong>
                                            <span style="color: #718096; font-size: 11.5px; line-height: 1.4; display: block; margin-top: 3px;">Stay updated on dynamic live bootcamps and structural code reviews.</span>
                                        </td>
                                        <td width="4%">&nbsp;</td>
                                        <td class="feature-box" width="48%" style="background-color: #fbfcfd; border: 1px solid #eaf0f6; border-radius: 10px; padding: 15px; text-align: left; vertical-align: top;">
                                            <span style="font-size: 18px; display: block; margin-bottom: 4px;">📈</span>
                                            <strong style="color: #14212a; font-size: 13.5px; display: block;">Track Learning Progress</strong>
                                            <span style="color: #718096; font-size: 11.5px; line-height: 1.4; display: block; margin-top: 3px;">Log logs push, evaluate consistency milestones, and check activity logs.</span>
                                        </td>
                                    </tr>
                                </table>
                                </div>

                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-gradient: linear-gradient(135deg, #fffcf6 0%, #faf5ea 100%); border-left: 4px solid #fb991d; background-color: #fdfaf4; border-radius: 0 8px 8px 0; padding: 16px; margin-top: 30px;">
                                    <tr>
                                        <td>
                                            <p style="margin: 0; font-size: 12.5px; color: #a16207; line-height: 1.5;">
                                                ℹ️ <strong>Quick Portal Guide:</strong> Log in using your registered email credentials. If you haven't altered your defaults yet, your <strong>Default Password is your Registered Phone Number</strong>.
                                            </p>
                                        </td>
                                    </tr>
                                </table>

                                <p style="color: #718096; font-size: 12px; line-height: 1.5; margin: 25px 0 0 0; text-align: center; font-style: italic;">
                                    Missed the live slot? Don't worry! This architecture video module remains unlocked inside your timeline dashboard for retrospective study sessions 24/7.
                                </p>

                            </td>
                        </tr>

                        <tr>
                            <td style="background-color: #fbfcfd; padding: 30px 40px; text-align: center; border-top: 1px solid #eef1f4;">
                                <p style="color: #14212a; font-size: 13px; margin: 0 0 4px 0; font-weight: 700;">
                                    Encountering Layout Breaks? 📞
                                </p>
                                <p style="color: #5d6971; font-size: 12px; margin: 0 0 20px 0; line-height: 1.45;">
                                    If you encounter any streaming validation issues or auth token loops, reach out to your sync mentor immediately or file a direct ticket via the support desk.
                                </p>
                                
                                <div style="border-top: 1px solid #eef1f4; margin: 15px 0; padding-top: 15px;"></div>

                                <p style="color: #14212a; font-size: 13px; margin: 0 0 2px 0; font-weight: 800;">
                                    JavaGurukul Systems
                                </p>
                                <p style="color: #fb991d; font-size: 11px; margin: 0 0 12px 0; font-weight: 700; letter-spacing: 0.5px;">
                                    EMPOWERING FUTURE DEVELOPERS 🚀
                                </p>
                                <p style="color: #a0aec0; font-size: 11px; margin: 0 0 8px 0; line-height: 1.4;">
                                    &copy; ${new Date().getFullYear()} JavaGurukul Core Onboarding Desk. All rights reserved.
                                </p>
                                <p style="color: #cbd5e1; font-size: 10px; margin: 0; line-height: 1.4; letter-spacing: 0.1px;">
                                    This is an automated system generated lecture validation notification from JavaGurukul. Please do not reply directly to this outbound string indexer inbox.
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

module.exports = lectureUploadTemplate;
