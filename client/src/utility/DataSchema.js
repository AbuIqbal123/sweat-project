export const modulesData = {
  ELEC362: {
    moduleCode: "ELEC362",
    moduleCredit: 15,
    totalStudyHours: 150, // 15 * 10
    timetabledHours: 48,
    privateStudyHours: 102, // Total Study Hours - Timetabled Hours
    labHours: [
      { week: 1, hours: 2 },
      { week: 2, hours: 2 },
      { week: 3, hours: 2 },
      { week: 4, hours: 2 },
      { week: 5, hours: 2 },
      { week: 6, hours: 2 },
      { week: 7, hours: 2 },
      { week: 8, hours: 2 },
      { week: 9, hours: 2 },
      { week: 10, hours: 2 },
      { week: 11, hours: 2 },
      { week: 12, hours: 2 },
    ],
    lectures: [
      { week: 1, hours: 2 },
      { week: 2, hours: 2 },
      { week: 3, hours: 2 },
      { week: 4, hours: 2 },
      { week: 5, hours: 2 },
      { week: 6, hours: 2 },
      { week: 7, hours: 2 },
      { week: 8, hours: 2 },
      { week: 9, hours: 2 },
      { week: 10, hours: 2 },
      { week: 11, hours: 2 },
      { week: 12, hours: 2 },
    ],
    tutorials: [],
    examPrep: {
      weeks: [13, 14, 15],
      weightage: 40,
    },
    courseworkPrep: [
      { deadline: 7, weightage: 10, studyHours: 10.2, distribution: [] },
      { deadline: 12, weightage: 50, studyHours: 51, distribution: [] },
    ],
  },
  ELEC320: {
    moduleCode: "ELEC320",
    moduleCredit: 7.5,
    totalStudyHours: 75, // 7.5 * 10
    timetabledHours: 18,
    privateStudyHours: 57, // Total Study Hours - Timetabled Hours
    labHours: [],
    lectures: [
      { week: 1, hours: 1 },
      { week: 2, hours: 1 },
      { week: 3, hours: 1 },
      { week: 4, hours: 1 },
      { week: 5, hours: 1 },
      { week: 6, hours: 1 },
      { week: 7, hours: 1 },
      { week: 8, hours: 1 },
      { week: 9, hours: 1 },
      { week: 10, hours: 1 },
      { week: 11, hours: 1 },
      { week: 12, hours: 1 },
    ],
    tutorials: [
      { week: 2, hours: 1 },
      { week: 4, hours: 1 },
      { week: 6, hours: 1 },
      { week: 8, hours: 1 },
      { week: 10, hours: 1 },
      { week: 12, hours: 1 },
    ],
    examPrep: {
      weeks: [13, 14, 15],
      weightage: 100,
    },
    courseworkPrep: [],
  },
};
