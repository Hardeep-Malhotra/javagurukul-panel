const meetingScheduleTemplate = ({
  studentName,
  title,
  teacherName,
  batch,
  meetingCode,
  zoomMeetingId,
  zoomPasscode,
  scheduledAt,
  meetingLink,
}) => {
  // IST Timezone Fix for Cloud Servers
  const date = new Date(scheduledAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });

  const time = new Date(scheduledAt).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });

  return `
<!DOCTYPE html>
<html>

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>JavaGurukul Live Class</title>
</head>

<body style="margin:0;padding:0;background-color:#f4f6f8;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="padding:30px 10px;background-color:#f4f6f8;">
<tr>
<td align="center">

<table width="100%" max-width="600" cellpadding="0" cellspacing="0"
style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 15px rgba(0,0,0,0.08);border:1px solid #e5e7eb;">

<!-- Header -->
<tr>
<td style="background:#fb991d;padding:25px;text-align:center;color:#ffffff;">
  <h1 style="margin:0;font-size:26px;font-weight:800;letter-spacing:1px;">JavaGurukul</h1>
</td>
</tr>

<!-- Body -->
<tr>
<td style="padding:30px 25px;">

<h2 style="margin-top:0;color:#14212a;font-size:20px;font-weight:700;">
📢 Live Class Scheduled!
</h2>

<p style="font-size:15px;color:#333333;margin-bottom:15px;">
Hello <strong>${studentName}</strong>,
</p>

<p style="font-size:14px;color:#555555;line-height:1.6;margin-bottom:25px;">
A new live class has been scheduled for your batch. Please find your class join credentials below.
</p>

<!-- Class Info Card -->
<table width="100%" cellpadding="0" cellspacing="0"
style="margin-top:15px;border-collapse:collapse;background:#fafafa;border-radius:8px;border:1px solid #edf2f7;overflow:hidden;">

<tr>
  <td style="padding:12px 15px;font-weight:600;color:#555;width:38%;border-bottom:1px solid #edf2f7;">📚 Class Title</td>
  <td style="padding:12px 15px;font-weight:700;color:#14212a;border-bottom:1px solid #edf2f7;">${title}</td>
</tr>

<tr>
  <td style="padding:12px 15px;font-weight:600;color:#555;border-bottom:1px solid #edf2f7;">👨‍🏫 Teacher</td>
  <td style="padding:12px 15px;color:#333;border-bottom:1px solid #edf2f7;">${teacherName}</td>
</tr>

<tr>
  <td style="padding:12px 15px;font-weight:600;color:#555;border-bottom:1px solid #edf2f7;">🎓 Batch</td>
  <td style="padding:12px 15px;color:#333;border-bottom:1px solid #edf2f7;">${batch}</td>
</tr>

<tr>
  <td style="padding:12px 15px;font-weight:600;color:#555;border-bottom:1px solid #edf2f7;">📅 Date</td>
  <td style="padding:12px 15px;color:#333;border-bottom:1px solid #edf2f7;">${date}</td>
</tr>

<tr>
  <td style="padding:12px 15px;font-weight:600;color:#555;border-bottom:1px solid #edf2f7;">⏰ Time</td>
  <td style="padding:12px 15px;color:#333;border-bottom:1px solid #edf2f7;">${time} (IST)</td>
</tr>

${
  meetingCode
    ? `
<tr>
  <td style="padding:12px 15px;font-weight:600;color:#555;border-bottom:1px solid #edf2f7;">🔑 Portal Code</td>
  <td style="padding:12px 15px;border-bottom:1px solid #edf2f7;">
    <span style="background:#fff3e0;color:#e65100;padding:4px 8px;border-radius:4px;font-weight:700;font-size:14px;">
      ${meetingCode}
    </span>
  </td>
</tr>
`
    : ""
}

${
  zoomMeetingId
    ? `
<tr>
  <td style="padding:12px 15px;font-weight:600;color:#555;border-bottom:1px solid #edf2f7;">🆔 Zoom ID</td>
  <td style="padding:12px 15px;color:#333;font-family:monospace;font-size:14px;border-bottom:1px solid #edf2f7;">
    ${zoomMeetingId}
  </td>
</tr>
`
    : ""
}

${
  zoomPasscode
    ? `
<tr>
  <td style="padding:12px 15px;font-weight:600;color:#555;">🔐 Passcode</td>
  <td style="padding:12px 15px;color:#333;font-family:monospace;font-size:14px;">
    ${zoomPasscode}
  </td>
</tr>
`
    : ""
}

</table>

<!-- CTA Button -->
<div style="text-align:center;margin-top:30px;margin-bottom:25px;">
  <a href="${meetingLink}" target="_blank"
  style="
  display:inline-block;
  background:#fb991d;
  padding:14px 32px;
  border-radius:6px;
  color:#ffffff;
  font-size:15px;
  font-weight:700;
  text-decoration:none;
  box-shadow:0 3px 6px rgba(251,153,29,0.3);
  ">
  🚀 Join Live Class
  </a>
</div>

<p style="margin-top:20px;font-size:13px;color:#777777;line-height:1.6;margin-bottom:5px;">
If the button above doesn't work, copy and paste this link into your browser:
</p>

<p style="word-break:break-all;font-size:13px;color:#17647e;margin-top:0;">
  <a href="${meetingLink}" style="color:#17647e;">${meetingLink}</a>
</p>

<hr style="margin:25px 0;border:none;border-top:1px solid #edf2f7;">

<p style="font-size:12px;color:#888888;text-align:center;margin:0;">
💡 Please join 5 minutes before the scheduled time for a smooth experience.
</p>

</td>
</tr>

<!-- Footer -->
<tr>
<td style="background:#14212a;color:#a0aec0;text-align:center;padding:18px;font-size:12px;">
© ${new Date().getFullYear()} JavaGurukul. All Rights Reserved.
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

module.exports = meetingScheduleTemplate;
