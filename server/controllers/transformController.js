const TransformedDataModel = require("../models/moduleSchema");
const ENV_ID = process.env.ENV_ID;

const transformInputToDatabaseSchema = async (inputData) => {
  console.log("input data", inputData);
  try {
    const input = inputData[0];
    const moduleCode = input.moduleCode;
    const moduleCredit = parseInt(input.moduleCredit);
    const timetabledHours = parseInt(input.timetabledHours);
    const lectures = parseInt(input.lectures);
    const seminars = parseInt(input.seminars);
    const tutorial = parseInt(input.tutorial);
    const labs = parseInt(input.labs);
    const other = parseInt(input.other);
    const weightage = parseInt(input.weightage);
    const deadline = parseInt(input.deadline);

    console.log("module code", moduleCode);
    console.log("lectures", lectures);

    const totalStudyHours = moduleCredit * 10;
    const privateStudyHours = totalStudyHours - timetabledHours;

    const createArrayWithWeeks = (hours) => {
      return Array.from({ length: 12 }, (_, index) => ({
        week: index + 1,
        hours: hours / 12,
      }));
    };

    const labHours = createArrayWithWeeks(labs);
    const lecturesData = createArrayWithWeeks(lectures);
    const tutorialsData = createArrayWithWeeks(tutorial);

    console.log("lectures", lecturesData);

    const examPrep = {
      weeks: [13, 14, 15],
      weightage,
    };

    const courseworkPrep = [
      {
        deadline,
        weightage,
        studyHours: (privateStudyHours * weightage) / 100,
        distributions: [],
      },
    ];

    const updatedData = {

        moduleCode,
        moduleCredit,
        totalStudyHours,
        timetabledHours,
        privateStudyHours,
        labHours,
        lectures: lecturesData,
        tutorials: tutorialsData,
        examPrep,
        courseworkPrep,
    };

    const examPrepWeeks = updatedData.examPrep?.weeks ?? [];
    const examPrepWeightage = updatedData.examPrep?.weightage ?? 0;

    const newData = {};

    if(updatedData.examPrep) {
      newData.examPrep = {
        weeks: updatedData.examPrep.weeks,
        weightage: updatedData.examPrep.weightage
      }
    }

    console.log("New data to save:", updatedData);

    const newDoc = new TransformedDataModel(updatedData);

    console.log("New doc created:", newDoc);

    await newDoc.save();

    console.log("New doc saved:", newDoc);

    return updatedData[moduleCode]; // Return the specific data updated/added
  } catch (error) {
    console.error("Error updating data in DB:", error);
    throw error;
  }
};

module.exports = transformInputToDatabaseSchema;
