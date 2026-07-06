const DemoClass = require("../../models/demoClassModel");

const addDemoClass = async (req, res) => {
  try {
    const {
      title,
      description,
      classType,
      classDate,
      classTime,
      meetingLink,
      videoUrl,
    } = req.body;

    if (!title || !classType) {
      return res.status(400).json({
        success: false,
        message: "Title and Class Type are required.",
      });
    }

    // Conditional Validation Check
    if (classType === "LIVE" && (!classDate || !classTime || !meetingLink)) {
      return res.status(400).json({
        success: false,
        message: "Please fill Date, Time, and Meeting Link for Live Session.",
      });
    }

    if (classType === "RECORDED" && !videoUrl) {
      return res.status(400).json({
        success: false,
        message: "Please provide Video URL for Recorded Session.",
      });
    }

    const newDemo = new DemoClass({
      title,
      description,
      classType,
      classDate: classType === "LIVE" ? classDate : undefined,
      classTime: classType === "LIVE" ? classTime : undefined,
      meetingLink: classType === "LIVE" ? meetingLink : undefined,
      videoUrl: classType === "RECORDED" ? videoUrl : undefined,
    });

    await newDemo.save();
    return res.status(201).json({
      success: true,
      message: `${classType} Demo added successfully!`,
      data: newDemo,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

module.exports = addDemoClass;
