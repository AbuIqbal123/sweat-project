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
  seminars: [{ week: Number, hours: Number }], // Add seminars field
  fieldworkPlacement: [{ week: Number, hours: Number }], // Add fieldworkPlacement field
  other: [{ week: Number, hours: Number }], // Add other field
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
