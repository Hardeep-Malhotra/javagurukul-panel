const getForgotPasswordTemplate = (otp) => {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; border: 1px solid #eee;">
      <h2 style="color: #2f8dae;">JavaGurukul Panel - Password Reset</h2>
      <p>Hello Admin,</p>
      <p>You requested a password reset for your administrator account. Use the secure 6-digit verification code below to proceed:</p>
      <div style="background: #f4f4f4; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #333; margin: 20px 0; border-radius: 8px;">
        ${otp}
      </div>
      <p style="color: #666; font-size: 12px;">This code is strictly valid for 5 minutes. If you did not request this, please ignore this email securely.</p>
    </div>
  `;
};

module.exports = getForgotPasswordTemplate;
