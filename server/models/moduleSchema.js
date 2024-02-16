const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema({
  moduleCode: String,
  moduleTitle: String,
  moduleCredit: Number,
  moduleSemester: String,
  courses: [String], // Array of strings to hold multiple course names
  totalStudyHours: Number,
  timetabledHours: Number,
  privateStudyHours: Number,
  labs: [{ week: Number, hours: Number }],
  lectures: [{ week: Number, hours: Number }],
  tutorials: [{ week: Number, hours: Number }],
  seminars: [{ week: Number, hours: Number }],
  fieldworkPlacement: [{ week: Number, hours: Number }],
  other: [{ week: Number, hours: Number }],
  examPrep: {
    weeks: [Number],
    weightage: Number,
  },
  coursework: [
    {
      assessmentType: String,
      studyHours: Number,
      weightage: Number,
      deadline: Number,
    },
  ],
  courseworkPrep: {
    balanced: [{ week: Number, hours: Number }],
    procrastinator: [{ week: Number, hours: Number }],
    earlybird: [{ week: Number, hours: Number }],
  },
});

const ModuleModel = mongoose.model("Module", moduleSchema);

module.exports = ModuleModel;
