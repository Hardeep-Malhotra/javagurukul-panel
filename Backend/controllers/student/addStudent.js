// 📄 Backend/controllers/student/addStudent.js
const Student = require("../../models/Student");
const sendEmail = require("../../utils/sendEmail");
const getStudentRegistrationTemplate = require("../../utils/emailTemplates/studentRegisterTemplate");

const addStudent = async (req, res, next) => {
  try {
    const { name, email, phone, address, batch, status } = req.body;

    // 1. Duplicate Check
    const existingStudent = await Student.findOne({
      email: email.toLowerCase().trim(),
    });
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: "Student already registered with this email",
      });
    }

    // 2. Student Creation
    const newStudent = new Student({
      name,
      email,
      phone,
      address,
      batch,
      // 🌟 FIXED: Passing phone number directly as default password for portal login
      password: phone,
      status: status || "Active",
      category: "REGISTERED",
    });

    await newStudent.save();

    // 🚀 3. Live Email Trigger from separate clean template file
    try {
      const emailSubject = "Welcome to JavaGurukul! 🎉 Portal Account Created";

      // 🌟 FIXED: Sent all required arguments (name, batch, email, phone) to the updated premium template
      const emailHtmlContent = getStudentRegistrationTemplate(
        name,
        batch,
        email,
        phone,
      );

      await sendEmail({
        to: email,
        subject: emailSubject,
        html: emailHtmlContent,
      });
      console.log(`📧 Separate Template Mail sent successfully to: ${email}`);
    } catch (mailError) {
      console.error("🚨 Email triggering issue:", mailError.message);
      // Not returning error here so that student is still considered registered in DB even if email fails
    }

    // 4. Success Response
    return res.status(201).json({
      success: true,
      message:
        "Student registered successfully & login credentials sent via Email!",
      data: newStudent,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addStudent;
