import Student from "../../models/Student.js";

export const checkEmailExists = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const existingStudent = await Student.findOne({
      email: email.toLowerCase().trim(),
    });

    if (existingStudent) {
      return res.status(200).json({
        success: true,
        exists: true,
        message: "This email is already registered!",
      });
    }

    return res.status(200).json({
      success: true,
      exists: false,
      message: "Email is available.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
