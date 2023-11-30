const TransformedDataModel = require("../models/moduleSchema");
const ENV_ID = process.env.ENV_ID;

const transformInputToDatabaseSchema = async (inputData) => {
  try {
    if (!Array.isArray(inputData) || inputData.length === 0) {
      throw new Error("Invalid input data");
    }

    console.log("Input Data:", JSON.stringify(inputData, null, 2));

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
      assessments,
      fieldworkPlacement,
    } = input;

    const parsedModuleCredit = parseInt(moduleCredit, 10);
    const parsedTimetabledHours = parseInt(timetabledHours, 10);
    const parsedLectures = parseInt(lectures, 10);
    const parsedSeminars = parseInt(seminars, 10);
    const parsedTutorial = parseInt(tutorial, 10);
    const parsedLabs = parseInt(labs, 10);
    const parsedOther = parseInt(other, 10);
    const parsedAssessmentDeadline = parseInt(assessments[0].deadline, 10);
    const parsedAssessmentWeightage = parseInt(assessments[0].weightage, 10);
    const parsedFieldworkPlacement = parseInt(fieldworkPlacement, 10);

    if (
      isNaN(parsedModuleCredit) ||
      isNaN(parsedTimetabledHours) ||
      isNaN(parsedLectures) ||
      isNaN(parsedSeminars) ||
      isNaN(parsedTutorial) ||
      isNaN(parsedLabs) ||
      isNaN(parsedOther) ||
      isNaN(parsedAssessmentDeadline) ||
      isNaN(parsedAssessmentWeightage) ||
      isNaN(parsedFieldworkPlacement)
    ) {
      throw new Error("Invalid numeric value in input");
    }

    const totalStudyHours = parsedModuleCredit * 10;
    const privateStudyHours = totalStudyHours - parsedTimetabledHours;

    const createArrayWithWeeks = (hours) => {
      return Array.from({ length: 12 }, (_, index) => ({
        week: index + 1,
        hours: hours / 12,
      }));
    };

    const tutorialsData = createArrayWithWeeks(parsedTutorial);
    const labsData = createArrayWithWeeks(parsedLabs);
    const lecturesData = createArrayWithWeeks(parsedLectures);
    const seminarsData = createArrayWithWeeks(parsedSeminars);
    const fieldworkPlacementData = createArrayWithWeeks(
      parsedFieldworkPlacement
    );
    const otherData = createArrayWithWeeks(parsedOther);

    const examAssessments = assessments.filter(
      (assessment) => assessment.assessmentType === "exam"
    );

    const courseworkAssessments = assessments.filter(
      (assessment) => assessment.assessmentType === "coursework"
    );

    const examPrep = {
      weeks: [13, 14, 15],
      weightage: parseInt(examAssessments[0]?.weightage || 0, 10),
    };

    const courseworkPrep = courseworkAssessments.map((coursework) => {
      return {
        deadline: parseInt(coursework.deadline || 0, 10),
        weightage: parseInt(coursework.weightage || 0, 10),
        studyHours:
          (privateStudyHours * parseInt(coursework.weightage || 0, 10)) / 100,
        distributions: [],
      };
    });

    const updatedData = {
      moduleCode,
      moduleCredit: parsedModuleCredit,
      totalStudyHours,
      timetabledHours: parsedTimetabledHours,
      privateStudyHours,
      labs: labsData,
      lectures: lecturesData,
      tutorials: tutorialsData,
      seminars: seminarsData,
      fieldworkPlacement: fieldworkPlacementData,
      other: otherData,
      examPrep,
      courseworkPrep,
    };

    const newData = {};

    if (updatedData.examPrep) {
      newData.examPrep = {
        weeks: updatedData.examPrep.weeks,
        weightage: updatedData.examPrep.weightage,
      };
    }

    const newDoc = new TransformedDataModel(updatedData);

    await newDoc.save();

    return updatedData[moduleCode]; // Return the specific data updated/added
  } catch (error) {
    console.error("Error updating data in DB:", error);
    throw error;
  }
};

module.exports = transformInputToDatabaseSchema;
