//models/moduleSchema.js

const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema({
  moduleCode: String,
  moduleCredit: Number,
  totalStudyHours: Number,
  timetabledHours: Number,
  privateStudyHours: Number,
  labHours: [{ week: Number, hours: Number }],
  lectures: [{ week: Number, hours: Number }],
  tutorials: [{ week: Number, hours: Number }],
  examPrep: {
    weeks: [Number],
    weightage: Number,
  },
  courseworkPrep: [
    {
      deadline: Number,
      weightage: Number,
      studyHours: Number,
      distribution: [],
    },
  ],
});

const ModuleModel = mongoose.model("modules", moduleSchema);

module.exports = ModuleModel;
