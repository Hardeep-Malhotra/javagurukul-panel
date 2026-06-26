// 📄 Backend/utils/studentRegisterTemplate.js

/**
 * Premium Educational Portal Theme HTML Email Template for Student Registration
 * @param {String} studentName - Name of the registered student
 * @param {String} batchName - Batch assigned to the student
 */
const getStudentRegistrationTemplate = (studentName, batchName) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to JavaGurukul</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #eef2f5; margin: 0; padding: 0; -webkit-font-smoothing: antialiased;">

        <div style="display:none; max-height:0; overflow:hidden; opacity:0;">
            Welcome to JavaGurukul, ${studentName}! Your portal registration is successful.
        </div>

        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #eef2f5; padding: 48px 0;">
            <tr>
                <td align="center">
                    <table role="presentation" width="100%" style="max-width: 560px; background-color: #ffffff; border-radius: 16px; box-shadow: 0 10px 35px rgba(20, 33, 42, 0.08); overflow: hidden; border: 1px solid #e6eaed;" cellspacing="0" cellpadding="0" border="0">

                        <tr>
                            <td style="background: linear-gradient(90deg, #14212a 0%, #17647e 55%, #2f8dae 100%); height: 6px; line-height: 6px; font-size: 0;">&nbsp;</td>
                        </tr>

                        <tr>
                            <td align="center" style="background-color: #ffffff; padding: 44px 24px 28px 24px;">
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                    <tr>
                                        <td align="center">
                                            <img src="https://res.cloudinary.com/dsc4cqkdd/image/upload/v1782110343/java-gurukul-logo_ek2ial.png"
                                                 alt="JavaGurukul"
                                                 width="180"
                                                 height="60"
                                                 style="max-width: 180px; width: 180px; height: auto; display: block; border: none; outline: none;" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center" style="padding-top: 4px;">
                                            <span style="color: #14212a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 19px; font-weight: 800; letter-spacing: -0.3px;">
                                                Java<span style="color: #fb991d;">Gurukul</span>
                                            </span>
                                        </td>
                                    </tr>
                                </table>

                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-top: 18px;">
                                    <tr>
                                        <td style="background-color: #e3f2fd; border: 1px solid #bbdefb; border-radius: 20px; padding: 5px 14px;">
                                            <span style="color: #0d47a1; font-family: sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.6px; text-transform: uppercase;">
                                                🎓 Student Onboarding Network
                                            </span>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <tr>
                            <td style="padding: 0 40px;">
                                <div style="border-top: 1px solid #eef1f4;"></div>
                            </td>
                        </tr>

                        <tr>
                            <td style="padding: 36px 40px 8px 40px; text-align: left;">
                                <h2 style="color: #14212a; margin: 0 0 14px 0; font-size: 23px; font-weight: 800; letter-spacing: -0.4px; line-height: 1.3;">
                                    Registration Successful! 🎉
                                </h2>

                                <p style="color: #5d6971; font-size: 15px; line-height: 1.65; margin: 0 0 28px 0;">
                                    Hello <strong>${studentName}</strong>,<br/><br/>
                                    Welcome to JavaGurukul! Your profile has been successfully generated on our student management system by the administrator. Below are your official enrollment details:
                                </p>

                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 28px;">
                                    <tr>
                                        <td style="background-color: #14212a; border-radius: 12px; padding: 24px 28px;">
                                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                                <tr>
                                                    <td style="padding-bottom: 12px; border-bottom: 1px solid #233543;">
                                                        <span style="color: #9fb4bd; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; display: block; margin-bottom: 4px;">Student Name</span>
                                                        <span style="font-size: 18px; font-weight: 700; color: #ffffff;">${studentName}</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="padding-top: 12px; padding-bottom: 12px; border-bottom: 1px solid #233543;">
                                                        <span style="color: #9fb4bd; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; display: block; margin-bottom: 4px;">Assigned Batch</span>
                                                        <span style="font-size: 16px; font-weight: 600; color: #fb991d;">${batchName}</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="padding-top: 12px;">
                                                        <span style="color: #9fb4bd; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; display: block; margin-bottom: 4px;">Current Status</span>
                                                        <span style="background-color: #fff4e6; color: #c2700f; padding: 3px 10px; border-radius: 6px; font-size: 12px; font-weight: 700; display: inline-block; margin-top: 2px;">REGISTERED</span>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>

                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                    <tr>
                                        <td style="background-color: #f0fdf4; border-left: 4px solid #22c55e; padding: 14px 18px; border-radius: 0 10px 10px 0;">
                                            <p style="color: #14532d; font-size: 13px; line-height: 1.55; margin: 0; font-weight: 500;">
                                                ℹ️ <strong>Next Step:</strong> You are currently listed in the 'Registered' pipeline. Once your curriculum map and subjects are activated by your dynamic mentor, your status will transition to 'Enrolled' and classes will start.
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <tr>
                            <td style="padding: 28px 40px 0 40px;">
                                <div style="border-top: 1px solid #eef1f4;"></div>
                            </td>
                        </tr>

                        <tr>
                            <td style="background-color: #fbfcfd; padding: 28px 40px 32px 40px; text-align: center;">
                                <p style="color: #14212a; font-size: 13px; margin: 0 0 4px 0; font-weight: 700;">
                                    JavaGurukul Educational Portal
                                </p>
                                <p style="color: #94a3b8; font-size: 12px; margin: 0 0 14px 0; font-weight: 500;">
                                    &copy; ${new Date().getFullYear()} All rights reserved.
                                </p>
                                <p style="color: #c2cbd1; font-size: 11px; margin: 0; letter-spacing: 0.2px; line-height: 1.6;">
                                    This is a system generated welcome email from JavaGurukul onboarding desk.<br/>
                                    Please secure your registered credentials for future portal interactions.
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
