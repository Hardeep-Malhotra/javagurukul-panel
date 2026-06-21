// 📄 Backend/utils/emailTemplate.js

/**
 * Premium & Ultra-Modern HTML Email Template for JavaGurukul
 * @param {String} otp - The 6 digit OTP
 * @param {String} title - Heading of the email
 * @param {String} description - Description message
 */
const getOTPTemplate = (
  otp,
  title = "Verification Required",
  description = "Use the following One-Time Password (OTP) to complete your login process. This code is valid for 5 minutes only.",
) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #fafafa; margin: 0; padding: 0; -webkit-font-smoothing: antialiased;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #fafafa; padding: 40px 0;">
            <tr>
                <td align="center">
                    <table role="presentation" width="100%" style="max-width: 560px; background-color: #ffffff; border-radius: 16px; box-shadow: 0 8px 30px rgba(0, 0, 0, 0.03); overflow: hidden; border: 1px solid #f0f0f0;" cellspacing="0" cellpadding="0" border="0">
                        
                        <tr>
                            <td align="center" style="background: linear-gradient(135deg, #0f172a, #1e1b4b); padding: 40px 20px; border-bottom: 3px solid #6366f1;">
                                <img src="https://javagurukul.com/images/java-gurukul-logo.png" alt="JavaGurukul Logo" style="max-width: 170px; height: auto; display: block;" />
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-top: 16px;">
                                    <tr>
                                        <td style="background-color: rgba(99, 102, 241, 0.15); border: 1px solid rgba(99, 102, 241, 0.3); border-radius: 20px; padding: 4px 12px;">
                                            <span style="color: #a5b4fc; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; display: block; line-height: 1;">
                                                🔒 Secure Gateway
                                            </span>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <tr>
                            <td style="padding: 45px 40px 35px 40px; text-align: left;">
                                <h2 style="color: #0f172a; margin: 0 0 16px 0; font-size: 22px; font-weight: 700; letter-spacing: -0.3px; line-height: 1.3;">
                                    ${title}
                                </h2>
                                
                                <p style="color: #475569; font-size: 15px; line-height: 1.6; margin: 0 0 32px 0;">
                                    ${description}
                                </p>
                                
                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 32px;">
                                    <tr>
                                        <td align="center" style="background-color: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 12px; padding: 24px 20px;">
                                            <span style="color: #64748b; font-size: 12px; font-weight: 500; text-transform: uppercase; letter-spacing: 1.5px; display: block; margin-bottom: 10px;">
                                                Your One-Time Password
                                            </span>
                                            <span style="font-family: 'SF Mono', SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace; font-size: 42px; font-weight: 800; letter-spacing: 8px; color: #4f46e5; display: block; line-height: 1; padding-left: 8px;">
                                                ${otp}
                                            </span>
                                        </td>
                                    </tr>
                                </table>

                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-top: 1px solid #f1f5f9; padding-top: 20px;">
                                    <tr>
                                        <td>
                                            <p style="color: #94a3b8; font-size: 13px; line-height: 1.5; margin: 0; text-align: center;">
                                                ⏳ This code expires in <strong style="color: #64748b;">5 minutes</strong>. If you did not request this authorization, you can safely ignore this system alert.
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <tr>
                            <td style="background-color: #f8fafc; padding: 24px 40px; text-align: center; border-top: 1px solid #f1f5f9;">
                                <p style="color: #94a3b8; font-size: 12px; margin: 0 0 6px 0; font-weight: 500;">
                                    &copy; ${new Date().getFullYear()} JavaGurukul. All security protocols active.
                                </p>
                                <p style="color: #cbd5e1; font-size: 11px; margin: 0;">
                                    Automated dispatch node. Replies are monitored but un-routed.
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
