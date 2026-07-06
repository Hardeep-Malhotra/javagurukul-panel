const express = require("express");
const router = express.Router();

const addDemoClass = require("../../controllers/demoClass/addDemoClass");
const getDemoClasses = require("../../controllers/demoClass/getDemoClasses");
const deleteDemoClass = require("../../controllers/demoClass/deleteDemoClass");

const demoClassValidator = require("../../validators/demoClassValidator");

router.post("/add", demoClassValidator, addDemoClass);
router.get("/all", getDemoClasses);
router.delete("/delete/:id", deleteDemoClass);

module.exports = router;
