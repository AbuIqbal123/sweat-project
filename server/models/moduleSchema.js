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
  seminars: [{ week: Number, hours: Number }],
  fieldworkPlacement: [{ week: Number, hours: Number }],
  other: [{ week: Number, hours: Number }],
  examPrep: {
    weeks: [Number],
    weightage: Number,
  },
  coursework: [
    {
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

const ModuleModel = mongoose.model("modules", moduleSchema);

module.exports = ModuleModel;
