// 📄 Backend/utils/emailTemplate.js

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
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f6f8; margin: 0; padding: 0; -webkit-font-smoothing: antialiased;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f4f6f8; padding: 40px 0;">
            <tr>
                <td align="center">
                    <table role="presentation" width="100%" style="max-width: 560px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05); overflow: hidden; border: 1px solid #e2e8f0;" cellspacing="0" cellpadding="0" border="0">
                       
                        <tr>
                            <td align="center" style="background-color: #ffffff; padding: 45px 20px 30px 20px; border-bottom: 4px solid #2f8dae;">
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff;">
                                    <tr>
                                        <td align="center" style="background-color: #ffffff;">
                                            <img src="https://javagurukul.com/images/java-gurukul-logo.png" 
                                                 alt="JavaGurukul Logo" 
                                                 style="max-width: 190px; width: 100%; height: auto; display: block; border: none; outline: none;" />
                                        </td>
                                    </tr>
                                </table>
                                
                                <p style="margin: 20px 0 0 0; color: #64748b; font-family: sans-serif; font-size: 13px; font-weight: 600; letter-spacing: 0.75px; text-transform: uppercase;">
                                    Internal Management Network
                                </p>
                            </td>
                        </tr>

                        <!-- EMAIL BODY CONTENT -->
                        <tr>
                            <td style="padding: 40px 40px 30px 40px; text-align: left;">
                                <h2 style="color: #1e293b; margin: 0 0 16px 0; font-size: 22px; font-weight: 700; letter-spacing: -0.4px; line-height: 1.3;">
                                    ${title}
                                </h2>
                                
                                <p style="color: #475569; font-size: 15px; line-height: 1.6; margin: 0 0 30px 0;">
                                    ${description}
                                </p>
                                
                                <!-- SECURITY OTP BOX -->
                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 30px;">
                                    <tr>
                                        <td align="center" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 26px 20px;">
                                            <span style="color: #64748b; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px; display: block; margin-bottom: 12px;">
                                                Security Verification Code
                                            </span>
                                            <span style="font-family: 'SF Mono', SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace; font-size: 44px; font-weight: 800; letter-spacing: 10px; color: #2f8dae; display: block; line-height: 1; padding-left: 10px;">
                                                ${otp}
                                            </span>
                                        </td>
                                    </tr>
                                </table>

                                <!-- NOTICE BOX -->
                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-top: 1px solid #e2e8f0; padding-top: 20px;">
                                    <tr>
                                        <td>
                                            <div style="background-color: #fff7ed; border-left: 4px solid #f97316; padding: 12px 16px; border-radius: 0 8px 8px 0;">
                                                <p style="color: #ea580c; font-size: 13px; line-height: 1.5; margin: 0; font-weight: 500;">
                                                    ⚠️ <strong>Security Notice:</strong> This code is valid for <strong>5 minutes</strong> only. Never share this administrative token with anyone. JavaGurukul support will never ask for your admin credential.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <!-- FOOTER -->
                        <tr>
                            <td style="background-color: #f8fafc; padding: 24px 40px; text-align: center; border-top: 1px solid #e2e8f0;">
                                <p style="color: #94a3b8; font-size: 12px; margin: 0 0 6px 0; font-weight: 500;">
                                    &copy; ${new Date().getFullYear()} JavaGurukul Educational Portal.
                                </p>
                                <p style="color: #cbd5e1; font-size: 11px; margin: 0; letter-spacing: 0.2px;">
                                    This is an automated system alert from the RBAC core. System IP and actions are logged.
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
