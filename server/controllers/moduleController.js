const Module = require("../models/moduleSchema");
const studyWorkloadSimulatorAlgorithm = require("../services/studyWorkloadService");
const { handleError } = require("../utils/errorUtils");

/**
 * Fetch a module from the database based on its module code.
 *
 * @param {Object} req - The Express request object.
 * @param {string} req.params.id - The module code.
 * @param {Object} res - The Express response object.
 */
const fetchData = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Module.findOne({ moduleCode: id });

    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ error: "Module not found!" });
    }
  } catch (err) {
    handleError(err, res);
  }
};

/**
 * Fetch all module codes based on specified filters.
 *
 * @param {Object} req - The Express request object.
 * @param {string} req.query.semester - The semester filter (optional).
 * @param {string} req.query.course - The course filter (optional).
 * @param {string} req.query.year - The study year filter (optional).
 * @param {Object} res - The Express response object.
 */
const fetchAllCodes = async (req, res) => {
  try {
    const { semester, course, year } = req.query;
    const query = {};

    if (semester && semester !== "All") {
      query.semester = semester.toLowerCase();
    }

    if (course && course !== "All") {
      query.programme = { $in: course };
    }

    if (year && year !== "All") {
      query.studyYear = year;
    }

    const codes = await Module.find(query);
    res.status(200).json(codes);
  } catch (err) {
    handleError(err, res);
  }
};

/**
 * Create a new module and store it in the database.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} req.body - The module data.
 * @param {Object} res - The Express response object.
 */
const createModule = async (req, res) => {
  try {
    const moduleData = studyWorkloadSimulatorAlgorithm(req.body);
    const newModule = new Module(moduleData);
    const savedModule = await newModule.save();

    if (savedModule) {
      res.status(201).json({ message: "Module created!" });
    }
  } catch (err) {
    handleError(err, res);
  }
};

/**
 * Update an existing module in the database.
 *
 * @param {Object} req - The Express request object.
 * @param {string} req.params.id - The module code.
 * @param {Object} req.body - The updated module data.
 * @param {Object} res - The Express response object.
 */
const updateModule = async (req, res) => {
  try {
    const { id } = req.params;
    const oldModule = await Module.findOne({ moduleCode: id });

    if (oldModule) {
      const newModuleData = studyWorkloadSimulatorAlgorithm(req.body);
      const updatedModule = await Module.findOneAndUpdate(
        { moduleCode: id },
        newModuleData,
        { new: true }
      );

      if (updatedModule) {
        res.status(200).json(updatedModule);
      } else {
        res.status(500).json({ error: "Unable to update module!" });
      }
    } else {
      res.status(404).json({ error: "Module not found!" });
    }
  } catch (err) {
    handleError(err, res);
  }
};

module.exports = {
  fetchData,
  createModule,
  updateModule,
  fetchAllCodes,
};
