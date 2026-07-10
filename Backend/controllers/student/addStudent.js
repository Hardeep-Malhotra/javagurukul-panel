// 📄 Backend/controllers/student/addStudent.js (Ya jo bhi aapka student create controller hai)
const Student = require("../../models/Student");
const Batch = require("../../models/Batch");
const sendEmail = require("../../utils/sendEmail");
const studentWelcomeTemplate = require("../../utils/emailTemplates/studentRegisterTemplate");

const addStudent = async (req, res, next) => {
  try {
    const { name, email, phone, address, batch, status } = req.body;

    // 1. Pehle check karo batch valid hai ya nahi aur full toh nahi hai
    // Hum batchName se search kar rahe hain kyunki modal batchName bhej raha hai
    const targetBatch = await Batch.findOne({ batchName: batch });
    if (!targetBatch) {
      return res
        .status(404)
        .json({ success: false, message: "Selected batch not found." });
    }

    if (targetBatch.currentStudentsCount >= targetBatch.capacity) {
      return res
        .status(400)
        .json({ success: false, message: "Batch capacity is full!" });
    }

    // 2. Student ko create karo
    const newStudent = new Student({
      name,
      email,
      phone,
      address,
      batch, // pure string mapping format
      status,
    });
    await newStudent.save();
    // 🌟 STEP 1: Mongoose document ko plain JS object me convert karo taaki data clean nikle
    const studentData = newStudent.toObject();

    try {
      await sendEmail({
        to: email,
        subject: "Welcome to Java Gurukul 🎉",
        html: studentWelcomeTemplate({
          studentName: String(name), // Matches template key
          batchName: String(batch), // Matches template key (batchName)
          studentEmail: String(email), // Matches template key
          studentPhone: String(phone), // Matches template key
        }),
      });
      console.log(`✉️ Welcome email dispatched successfully to: ${email}`);
    } catch (emailError) {
      console.error("Email Error:", emailError.message);
    }

    // 🌟 MAGIC LINE: Isi batch ka currentStudentsCount atomic tareeke se +1 badhao
    await Batch.findByIdAndUpdate(targetBatch._id, {
      $inc: { currentStudentsCount: 1 },
    });

    return res.status(201).json({
      success: true,
      message: "Student added successfully and batch matrix updated!",
      data: newStudent,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addStudent;
