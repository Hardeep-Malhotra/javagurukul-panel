const DemoClass = require("../../models/demoClassModel");

const deleteDemoClass = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await DemoClass.findByIdAndDelete(id);

    if (!deletedItem) {
      return res
        .status(404)
        .json({ success: false, message: "Demo not found." });
    }
    return res
      .status(200)
      .json({ success: true, message: "Demo deleted successfully!" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

module.exports = deleteDemoClass;
