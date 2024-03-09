const mongoose = require("mongoose");

const distributionSchema = new mongoose.Schema({
  week: Number,
  hours: Number,
});

const moduleSchema = new mongoose.Schema({
  moduleCode: String,
  studyYear: Number,
  title: String,
  optional: Boolean,
  programme: [String],
  semester: String,
  moduleCredit: Number,
  totalStudyHours: Number,
  timetabledHours: Number,
  privateStudyHours: Number,
  lectures: {
    hours: Number,
    distribution: [distributionSchema],
  },
  seminars: {
    hours: Number,
    distribution: [distributionSchema],
  },
  tutorials: {
    hours: Number,
    distribution: [distributionSchema],
  },
  labs: {
    hours: Number,
    distribution: [distributionSchema],
  },
  fieldworkPlacement: {
    hours: Number,
    distribution: [distributionSchema],
  },
  other: {
    hours: Number,
    distribution: [distributionSchema],
  },
  examPrep: {
    deadline: Number,
    weightage: Number,
    studyHours: Number,
    distribution: [distributionSchema],
  },
  courseworkPrep: [
    {
      deadline: Number,
      weightage: Number,
      studyHours: Number,
      distribution: {
        earlybird: [distributionSchema],
        moderate: [distributionSchema],
        procrastinator: [distributionSchema],
      },
    },
  ],
  classtestPrep: [
    {
      deadline: Number,
      weightage: Number,
      studyHours: Number,
      distribution: {
        earlybird: [distributionSchema],
        moderate: [distributionSchema],
        procrastinator: [distributionSchema],
      },
    },
  ],
  totalHours: [distributionSchema],
});

const Module = mongoose.model("Module", moduleSchema);

module.exports = Module;
