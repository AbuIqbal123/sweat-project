const generateDistribution = require("../utils/distributionUtils");
const aggregateDistributions = require("../utils/distributionUtils");

/**
 * Generates the study workload distribution for a module.
 *
 * @param {Object} data - The module data.
 * @param {string} data.moduleCode - The module code.
 * @param {number} data.moduleCredit - The module credits.
 * @param {number} data.timetabledHours - The timetabled hours for the module.
 * @param {number} data.lectures - The number of lecture hours.
 * @param {number} data.seminars - The number of seminar hours.
 * @param {string} data.semester - The semester.
 * @param {string} data.title - The module title.
 * @param {string[]} data.programme - The program(s) associated with the module.
 * @param {number} data.studyYear - The study year.
 * @param {number} data.tutorials - The number of tutorial hours.
 * @param {boolean} data.optional - Indicates if the module is optional.
 * @param {number} data.labs - The number of lab hours.
 * @param {number} data.fieldworkPlacement - The number of fieldwork/placement hours.
 * @param {number} data.other - The number of other hours.
 * @param {Object} data.examPrep - The exam preparation details.
 * @param {number} data.examPrep.deadline - The exam preparation deadline.
 * @param {number} data.examPrep.weightage - The weightage of the exam.
 * @param {Object[]} data.courseworkPrep - The coursework preparation details.
 * @param {Object[]} data.classtestPrep - The classtest preparation details.
 * @returns {Object} - The module object with study workload distribution.
 * @throws {Error} - If an error occurs during the processing.
 */

const studyWorkloadSimulatorAlgorithm = (data) => {
  try {
    const {
      moduleCode,
      moduleCredit,
      timetabledHours,
      lectures,
      seminars,
      semester,
      title,
      programme,
      studyYear,
      tutorials,
      optional,
      labs,
      fieldworkPlacement,
      other,
      examPrep,
      courseworkPrep,
      classtestPrep,
    } = data;
    const totalStudyHours = moduleCredit * 10;
    const privateStudyHours = totalStudyHours - timetabledHours;
    const numWeeks = 15;
    const lecturesDistribution = [];
    let hoursPerWeek = lectures / 12;
    for (let week = 1; week <= numWeeks; week++) {
      const hoursForWeek = week <= 12 ? hoursPerWeek : 0;
      lecturesDistribution.push({
        week,
        hours:
          hoursForWeek % 2 === 0
            ? hoursForWeek
            : Number(hoursForWeek.toFixed(2)),
      });
    }
    const lecturesObject = {
      hours: lectures,
      distribution: lecturesDistribution,
    };

    const seminarsDistribution = [];
    hoursPerWeek = seminars / 12;
    for (let week = 1; week <= numWeeks; week++) {
      const hoursForWeek = week <= 12 ? hoursPerWeek : 0;
      seminarsDistribution.push({
        week,
        hours:
          hoursForWeek % 2 === 0
            ? hoursForWeek
            : Number(hoursForWeek.toFixed(2)),
      });
    }
    const seminarsObject = {
      hours: seminars,
      distribution: seminarsDistribution,
    };

    const tutorialsDistribution = [];
    hoursPerWeek = tutorials / 12;
    for (let week = 1; week <= numWeeks; week++) {
      const hoursForWeek = week <= 12 ? hoursPerWeek : 0;
      tutorialsDistribution.push({
        week,
        hours:
          hoursForWeek % 2 === 0
            ? hoursForWeek
            : Number(hoursForWeek.toFixed(2)),
      });
    }
    const tutorialsObject = {
      hours: tutorials,
      distribution: tutorialsDistribution,
    };

    const labsDistribution = [];
    hoursPerWeek = labs / 12;
    for (let week = 1; week <= numWeeks; week++) {
      const hoursForWeek = week <= 12 ? hoursPerWeek : 0;
      labsDistribution.push({
        week,
        hours:
          hoursForWeek % 2 === 0
            ? hoursForWeek
            : Number(hoursForWeek.toFixed(2)),
      });
    }
    const labsObject = {
      hours: labs,
      distribution: labsDistribution,
    };

    const fieldworkPlacementDistribution = [];
    hoursPerWeek = fieldworkPlacement / 12;
    for (let week = 1; week <= numWeeks; week++) {
      const hoursForWeek = week <= 12 ? hoursPerWeek : 0;
      fieldworkPlacementDistribution.push({
        week,
        hours:
          hoursForWeek % 2 === 0
            ? hoursForWeek
            : Number(hoursForWeek.toFixed(2)),
      });
    }
    const fieldworkPlacementObject = {
      hours: fieldworkPlacement,
      distribution: fieldworkPlacementDistribution,
    };

    const otherDistribution = [];
    hoursPerWeek = other / 12;
    for (let week = 1; week <= numWeeks; week++) {
      const hoursForWeek = week <= 12 ? hoursPerWeek : 0;
      otherDistribution.push({
        week,
        hours:
          hoursForWeek % 2 === 0
            ? hoursForWeek
            : Number(hoursForWeek.toFixed(2)),
      });
    }
    const otherObject = {
      hours: other,
      distribution: otherDistribution,
    };

    let maxStudyHours = Number(process.env.MAX_STUDY_HOURS);
    const examStudyHours = Number(
      ((privateStudyHours * examPrep.weightage) / 100).toFixed(2)
    );
    const examPrepDistribution = [];
    hoursPerWeek = examStudyHours / 3;
    for (let week = 1; week <= numWeeks; week++) {
      const hoursForWeek = week > 12 ? hoursPerWeek : 0;
      examPrepDistribution.push({
        week,
        hours:
          hoursForWeek % 2 === 0
            ? hoursForWeek
            : Number(hoursForWeek.toFixed(2)),
      });
    }
    const examPrepObject = {
      deadline: examPrep.deadline,
      weightage: examPrep.weightage,
      studyHours: examStudyHours,
      distribution: examPrepDistribution,
    };

    let courseworkStudyHours;
    const courseworkPrepObject = courseworkPrep.map((coursework) => {
      const { deadline, weightage } = coursework;
      courseworkStudyHours = Number(
        ((privateStudyHours * weightage) / 100).toFixed(2)
      );
      const {
        earlyBirdDistribution,
        moderateDistribution,
        procrastinatorDistribution,
      } = generateDistribution(deadline, courseworkStudyHours, maxStudyHours);

      return {
        deadline,
        weightage,
        studyHours: courseworkStudyHours,
        distribution: {
          earlybird: earlyBirdDistribution,
          moderate: moderateDistribution,
          procrastinator: procrastinatorDistribution,
        },
      };
    });

    let classtestStudyHours;
    const classtestPrepObject = classtestPrep.map((classtest) => {
      const { deadline, weightage } = classtest;
      classtestStudyHours = Number(
        ((privateStudyHours * weightage) / 100).toFixed(2)
      );
      const {
        earlyBirdDistribution,
        moderateDistribution,
        procrastinatorDistribution,
      } = generateDistribution(deadline, classtestStudyHours, maxStudyHours);

      return {
        deadline,
        weightage,
        studyHours: classtestStudyHours,
        distribution: {
          earlybird: earlyBirdDistribution,
          moderate: moderateDistribution,
          procrastinator: procrastinatorDistribution,
        },
      };
    });

    let courseworkModerateDistributions = [];
    if (courseworkPrep && courseworkPrep.length > 0) {
      courseworkModerateDistributions = courseworkPrepObject.flatMap(
        (coursework) => coursework.distribution.moderate
      );
    } else {
      console.log("courseworkPrep is empty. Skipping processing.");
    }

    let classtestModerateDistributions = [];
    if (classtestPrep && classtestPrep.length > 0) {
      classtestModerateDistributions = classtestPrepObject.flatMap(
        (classtest) => classtest.distribution.moderate
      );
    } else {
      console.log("classtestPrep is empty. Skipping processing.");
    }

    const totalHours = aggregateDistributions([
      lecturesDistribution,
      seminarsDistribution,
      tutorialsDistribution,
      labsDistribution,
      fieldworkPlacementDistribution,
      otherDistribution,
      examPrepDistribution,
      courseworkModerateDistributions,
      classtestModerateDistributions,
    ]);

    const module = {
      moduleCode,
      moduleCredit,
      totalStudyHours,
      timetabledHours,
      privateStudyHours,
      semester,
      title,
      programme,
      studyYear,
      optional,
      lectures: lecturesObject,
      seminars: seminarsObject,
      tutorials: tutorialsObject,
      labs: labsObject,
      fieldworkPlacement: fieldworkPlacementObject,
      other: otherObject,
      examPrep: examPrepObject,
      courseworkPrep: courseworkPrepObject,
      classtestPrep: classtestPrepObject,
      totalHours,
    };
    return module;
  } catch (error) {
    console.error("Error in studyWorkloadSimulatorAlgorithm:", error);
    throw error;
  }
};

module.exports = studyWorkloadSimulatorAlgorithm;
