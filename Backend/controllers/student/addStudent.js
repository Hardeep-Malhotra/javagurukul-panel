// 📄 Backend/controllers/student/addStudent.js (Ya jo bhi aapka student create controller hai)
const Student = require("../../models/Student");
const Batch = require("../../models/Batch"); // 🌟 Batch model ko import karo

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
