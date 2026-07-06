const DemoClass = require("../../models/demoClassModel");

const getDemoClasses = async (req, res) => {
  try {
    // Latest pehle dikhane ke liye sort kiya hai
    const data = await DemoClass.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

module.exports = getDemoClasses;
