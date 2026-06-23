const Student = require("../../models/Student");
const sendEmail = require("../../utils/sendEmail");
const getStudentRegistrationTemplate = require("../../utils/studentRegisterTemplate"); // 👈 Clean Separate File Call!

const addStudent = async (req, res, next) => {
  try {
    const { name, email, phone, address, batch, status } = req.body;

    // 1. Duplicate Check
    const existingStudent = await Student.findOne({ email });
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
      status: status || "Active",
      category: "REGISTERED",
    });

    await newStudent.save();

    // 🚀 3. Live Email Trigger from separate clean template file
    try {
      const emailSubject = "Welcome to JavaGurukul! 🎉 Portal Account Created";
      const emailHtmlContent = getStudentRegistrationTemplate(name, batch);

      await sendEmail({
        to: email,
        subject: emailSubject,
        html: emailHtmlContent,
      });
      console.log(`📧 Separate Template Mail sent successfully to: ${email}`);
    } catch (mailError) {
      console.error("🚨 Email triggering issue:", mailError.message);
    }

    // 4. Success Response
    return res.status(201).json({
      success: true,
      message: "Student registered successfully!",
      data: newStudent,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addStudent;
