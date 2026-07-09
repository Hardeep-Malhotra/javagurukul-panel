const express = require("express");
const router = express.Router();
const createBatch = require("../controllers/batch/createBatch");
const getAllBatches = require("../controllers/batch/getAllBatches");
const editBatch = require("../controllers/batch/editBatch"); // 🌟 New
const deleteBatch = require("../controllers/batch/deleteBatch"); // 🌟 New

router.post("/add", createBatch);
router.get("/all", getAllBatches);
router.put("/edit/:id", editBatch);
router.delete("/delete/:id", deleteBatch);

module.exports = router;
