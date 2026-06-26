/**
 * Premium Educational Portal Theme HTML Email Template for JavaGurukul
 * @param {String} otp - The 6 digit OTP
 * @param {String} title - Heading of the email
 * @param {String} description - Description message
 */
const getOTPTemplate = (
  otp,
  title = "Admin Verification Required",
  description = "A request has been made to access the JavaGurukul Admin Control Panel. Use the secure One-Time Password (OTP) below to complete your authentication. This code is strictly valid for 5 minutes.",
) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <!--[if mso]>
        <noscript>
            <xml>
                <o:OfficeDocumentSettings>
                    <o:PixelsPerInch>96</o:PixelsPerInch>
                </o:OfficeDocumentSettings>
            </xml>
        </noscript>
        <![endif]-->
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #eef2f5; margin: 0; padding: 0; -webkit-font-smoothing: antialiased;">

        <!-- PREHEADER (hidden preview text in inbox) -->
        <div style="display:none; max-height:0; overflow:hidden; opacity:0;">
            Your secure JavaGurukul admin verification code is inside. Valid for 5 minutes only.
        </div>

        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #eef2f5; padding: 48px 0;">
            <tr>
                <td align="center">
                    <table role="presentation" width="100%" style="max-width: 560px; background-color: #ffffff; border-radius: 16px; box-shadow: 0 10px 35px rgba(20, 33, 42, 0.08); overflow: hidden; border: 1px solid #e6eaed;" cellspacing="0" cellpadding="0" border="0">

                        <!-- TOP ACCENT BAR -->
                        <tr>
                            <td style="background: linear-gradient(90deg, #14212a 0%, #17647e 55%, #2f8dae 100%); height: 6px; line-height: 6px; font-size: 0;">&nbsp;</td>
                        </tr>

                        <!-- HEADER -->
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
                                        <td style="background-color: #fff4e6; border: 1px solid #fde0b3; border-radius: 20px; padding: 5px 14px;">
                                            <span style="color: #c2700f; font-family: sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.6px; text-transform: uppercase;">
                                                🔒 Internal Management Network
                                            </span>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <!-- DIVIDER -->
                        <tr>
                            <td style="padding: 0 40px;">
                                <div style="border-top: 1px solid #eef1f4;"></div>
                            </td>
                        </tr>

                        <!-- BODY -->
                        <tr>
                            <td style="padding: 36px 40px 8px 40px; text-align: left;">
                                <h2 style="color: #14212a; margin: 0 0 14px 0; font-size: 23px; font-weight: 800; letter-spacing: -0.4px; line-height: 1.3;">
                                    ${title}
                                </h2>

                                <p style="color: #5d6971; font-size: 15px; line-height: 1.65; margin: 0 0 28px 0;">
                                    ${description}
                                </p>

                                <!-- SECURITY OTP BOX -->
                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 28px;">
                                    <tr>
                                        <td align="center" style="background-color: #14212a; border-radius: 12px; padding: 30px 20px;">
                                            <span style="color: #9fb4bd; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; display: block; margin-bottom: 14px; font-family: sans-serif;">
                                                Security Verification Code
                                            </span>
                                            <span style="font-family: 'SF Mono', SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace; font-size: 42px; font-weight: 800; letter-spacing: 12px; color: #fb991d; display: block; line-height: 1; padding-left: 12px;">
                                                ${otp}
                                            </span>
                                            <span style="color: #5d6971; font-size: 12px; display: block; margin-top: 16px; font-family: sans-serif;">
                                                Expires in <strong style="color: #ffffff;">5 minutes</strong>
                                            </span>
                                        </td>
                                    </tr>
                                </table>

                                <!-- NOTICE BOX -->
                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                    <tr>
                                        <td style="background-color: #fff7ed; border-left: 4px solid #fb991d; padding: 14px 18px; border-radius: 0 10px 10px 0;">
                                            <p style="color: #9a4a0a; font-size: 13px; line-height: 1.55; margin: 0; font-weight: 500;">
                                                ⚠️ <strong>Security Notice:</strong> Never share this code with anyone, including JavaGurukul staff. If you did not request this, please ignore this email and secure your account immediately.
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <!-- SPACER -->
                        <tr>
                            <td style="padding: 28px 40px 0 40px;">
                                <div style="border-top: 1px solid #eef1f4;"></div>
                            </td>
                        </tr>

                        <!-- FOOTER -->
                        <tr>
                            <td style="background-color: #fbfcfd; padding: 28px 40px 32px 40px; text-align: center;">
                                <p style="color: #14212a; font-size: 13px; margin: 0 0 4px 0; font-weight: 700;">
                                    JavaGurukul Educational Portal
                                </p>
                                <p style="color: #94a3b8; font-size: 12px; margin: 0 0 14px 0; font-weight: 500;">
                                    &copy; ${new Date().getFullYear()} All rights reserved.
                                </p>
                                <p style="color: #c2cbd1; font-size: 11px; margin: 0; letter-spacing: 0.2px; line-height: 1.6;">
                                    This is an automated system alert from the RBAC core.<br/>
                                    System IP and actions are logged for security purposes.
                                </p>
                            </td>
                        </tr>

                    </table>

                    <!-- BELOW-CARD NOTE -->
                    <table role="presentation" width="100%" style="max-width: 560px;" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                            <td align="center" style="padding-top: 20px;">
                                <p style="color: #9aa5ab; font-size: 11px; margin: 0;">
                                    This is an automated message — please do not reply directly to this email.
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

module.exports = getOTPTemplate;
