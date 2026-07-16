const meetingScheduleTemplate = ({
  studentName,
  title,
  teacherName,
  batch,
  meetingCode,
  scheduledAt,
  meetingLink,
}) => {
  const date = new Date(scheduledAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const time = new Date(scheduledAt).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `
<!DOCTYPE html>
<html>

<head>
<meta charset="UTF-8">
<title>JavaGurukul Live Class</title>
</head>

<body style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
<tr>
<td align="center">

<table width="650" cellpadding="0" cellspacing="0"
style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 5px 20px rgba(0,0,0,.08);">

<!-- Header -->
<tr>
<td
style="background:#fb991d;padding:30px;text-align:center;color:white;font-size:28px;font-weight:bold;">
JavaGurukul
</td>
</tr>

<!-- Body -->
<tr>
<td style="padding:40px;">

<h2 style="margin-top:0;color:#14212a;">
📢 Live Class Scheduled
</h2>

<p style="font-size:16px;color:#444;">
Hello <strong>${studentName}</strong>,
</p>

<p style="font-size:15px;color:#555;line-height:1.7;">
A new live class has been scheduled for your batch.
Please find the meeting details below.
</p>

<table
style="width:100%;margin-top:25px;border-collapse:collapse;background:#fafafa;border-radius:8px;">

<tr>
<td style="padding:15px;font-weight:bold;width:35%;">📚 Class Title</td>
<td style="padding:15px;">${title}</td>
</tr>

<tr style="background:#ffffff;">
<td style="padding:15px;font-weight:bold;">👨‍🏫 Teacher</td>
<td style="padding:15px;">${teacherName}</td>
</tr>

<tr>
<td style="padding:15px;font-weight:bold;">🎓 Batch</td>
<td style="padding:15px;">${batch}</td>
</tr>

<tr style="background:#ffffff;">
<td style="padding:15px;font-weight:bold;">📅 Date</td>
<td style="padding:15px;">${date}</td>
</tr>

<tr>
<td style="padding:15px;font-weight:bold;">⏰ Time</td>
<td style="padding:15px;">${time}</td>
</tr>

<tr style="background:#ffffff;">
<td style="padding:15px;font-weight:bold;">🔑 Meeting Code</td>
<td style="padding:15px;">
<strong style="font-size:18px;color:#fb991d;">
${meetingCode}
</strong>
</td>
</tr>

</table>

<div style="text-align:center;margin-top:40px;">

<a href="${meetingLink}"
style="
display:inline-block;
background:#fb991d;
padding:16px 35px;
border-radius:8px;
color:#ffffff;
font-size:16px;
font-weight:bold;
text-decoration:none;
">
🚀 Join Live Class
</a>

</div>

<p style="margin-top:35px;font-size:14px;color:#777;line-height:1.8;">
If the button doesn't work, copy and paste the following link into your browser:
</p>

<p style="word-break:break-all;color:#17647e;">
${meetingLink}
</p>

<hr style="margin:35px 0;border:none;border-top:1px solid #eee;">

<p style="font-size:13px;color:#999;text-align:center;">
Please keep your Meeting Code secure.
Join the meeting a few minutes before the scheduled time.
</p>

</td>
</tr>

<!-- Footer -->
<tr>
<td
style="background:#14212a;color:white;text-align:center;padding:20px;font-size:13px;">
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
