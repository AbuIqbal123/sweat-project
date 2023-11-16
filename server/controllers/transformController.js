const TransformedDataModel = require("../models/moduleSchema");
const ENV_ID = process.env.ENV_ID;

const transformInputToDatabaseSchema = async (inputData) => {
  try {
    const input = inputData[0];
    const {
      moduleCode,
      moduleCredit,
      timetabledHours,
      lectures,
      seminars,
      tutorial,
      labs,
      other,
      assessmentType,
      weightage,
      deadline,
    } = input;

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
      [moduleCode]: {
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
      },
    };

    let existingDocument = await TransformedDataModel.findById(ENV_ID);

    if (existingDocument) {
      // Update the existing document with new module code key and values
      existingDocument[moduleCode] = updatedData[moduleCode];
      await existingDocument.save();
      console.log("Data updated in DB:", existingDocument);
    } else {
      // Create a new document with the structure
      existingDocument = new TransformedDataModel({
        _id: ENV_ID,
        [moduleCode]: updatedData[moduleCode],
      });
      await existingDocument.save();
      console.log("New document created in DB:", existingDocument);
    }

    return updatedData[moduleCode]; // Return the specific data updated/added
  } catch (error) {
    console.error("Error updating data in DB:", error);
    throw error;
  }
};

module.exports = transformInputToDatabaseSchema;
