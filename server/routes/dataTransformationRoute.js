const express = require("express");
const router = express.Router();
const transformInputToDatabaseSchema = require("../controllers/transformController");

router.post("/transformData", async (req, res) => {
  try {
    const inputData = req.body;
    const transformedData = await transformInputToDatabaseSchema(inputData);

    res.status(200).json(transformedData);
  } catch (error) {
    console.error("Error transforming data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
