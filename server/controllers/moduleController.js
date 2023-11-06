const Module = require("../models/modulesSchema");

exports.getModules = async (req, res) => {
  try {
    const modules = await Module.find();
    res.json(modules);
  } catch (error) {
    console.error("Error fetching modules:", error);
    res.status(500).json({ error: "Could not retrieve modules" });
  }
};
