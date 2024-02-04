const TransformedDataModel = require("../models/moduleSchema");
const { distributeStudyHours } = require("./distributeFunction");

const transformInputToDatabaseSchema = async (inputData) => {
  try {
    if (!Array.isArray(inputData) || inputData.length === 0) {
      throw new Error("Invalid input data");
    }

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
    const parsedFieldworkPlacement = parseInt(fieldworkPlacement, 10);

    if (
      isNaN(parsedModuleCredit) ||
      isNaN(parsedTimetabledHours) ||
      isNaN(parsedLectures) ||
      isNaN(parsedSeminars) ||
      isNaN(parsedTutorial) ||
      isNaN(parsedLabs) ||
      isNaN(parsedOther) ||
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

    const coursework = assessments
      .filter((assessment) => assessment.assessmentType === "coursework" || assessment.assessmentType === "class test")
      .map((assessment) => {
        const assessmentType = assessment.assessmentType;
        const weightage = parseInt(assessment.weightage, 10);
        const deadline = parseInt(assessment.deadline, 10);
        const studyHours = (weightage / 100) * privateStudyHours;

        return {
          assessmentType,
          weightage,
          deadline,
          distribution: [],
          studyHours,
        };
      });

    const examPrep = {
      weeks: [13, 14, 15],
      weightage: parseInt(examAssessments[0]?.weightage || 0, 10),
    };
    const courseworkPrep = {
      balanced: createArrayWithWeeks(0), // Replace 0 with your initial value if necessary
      procrastinator: createArrayWithWeeks(0), // Replace 0 with your initial value if necessary
      earlybird: createArrayWithWeeks(0), // Replace 0 with your initial value if necessary
    };

    coursework.forEach((courseworkItem) => {
      const { studyHours, deadline } = courseworkItem;

      const balancedDistribution = distributeStudyHours(
        studyHours,
        deadline,
        "balanced"
      );
      const procrastinatorDistribution = distributeStudyHours(
        studyHours,
        deadline,
        "procrastinator"
      );
      const earlybirdDistribution = distributeStudyHours(
        studyHours,
        deadline,
        "earlybird"
      );

      balancedDistribution.forEach((weekData, index) => {
        courseworkPrep.balanced[index].hours += weekData.hours;
      });

      procrastinatorDistribution.forEach((weekData, index) => {
        courseworkPrep.procrastinator[index].hours += weekData.hours;
      });

      earlybirdDistribution.forEach((weekData, index) => {
        courseworkPrep.earlybird[index].hours += weekData.hours;
      });
    });

    console.log("coursework prep", courseworkPrep);

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
      coursework,
      courseworkPrep,
    };

    const newDoc = new TransformedDataModel(updatedData);
    await newDoc.save();

    return updatedData[moduleCode];
  } catch (error) {
    console.error("Error updating data in DB:", error);
    throw error;
  }
};

module.exports = transformInputToDatabaseSchema;
