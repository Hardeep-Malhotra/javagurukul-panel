const express = require("express");
const router = express.Router();

const createBatch = require("../controllers/batch/createBatch");
const getAllBatches = require("../controllers/batch/getAllBatches");

router.post("/add", createBatch);
router.get("/all", getAllBatches);

module.exports = router;
