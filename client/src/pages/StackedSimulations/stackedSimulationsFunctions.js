import moduleService from "../../services/moduleService"; // Adjust the import path as needed

export const fetchModulesData = async () => {
  try {
    const res = await moduleService.getCodes("");
    return res.data;
  } catch (error) {
    console.error("Failed to fetch modules data:", error);
    throw new Error("Failed to fetch modules data");
  }
};

export const programmeOptions = [
  { value: "CSEE", label: "CSEE" },
  { value: "MCR", label: "MCR" },
  { value: "AVS", label: "AVS" },
  { value: "EEE", label: "EEE" },
];
export const yearOptions = [
  { value: 1, label: "Year 1" },
  { value: 2, label: "Year 2" },
  { value: 3, label: "Year 3" },
];
export const semesterOptions = [
  { value: "first", label: "First" },
  { value: "second", label: "Second" },
];

export const programmeColors = {
  CSEE: "#4e79a7", // Steel Blue
  MCR: "#f28e2c", // Orange
  AVS: "#e15759", // Salmon
  EEE: "#76b7b2", // Aquamarine
};

export const generateRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  let unique = false;
  while (!unique) {
    color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    // Check if the generated color is unique
    unique = !Object.values(programmeColors).includes(color);
  }
  return color;
};

export const transformModulesData = (
  modulesData,
  selectedModules,
  selectedProgrammes,
  selectedYear,
  selectedSemester
) => {
  let data = [];

  modulesData.forEach((module) => {
    const moduleSelected = selectedModules.some(
      (m) => m.value === module.moduleCode
    );
    const programmeSelected = module.programme.some((prog) =>
      selectedProgrammes.map((sp) => sp.value).includes(prog)
    );
    const yearSelected =
      selectedYear.length === 0 ||
      selectedYear.some((y) => y.value === module.studyYear);
    const semesterSelected =
      selectedSemester.length === 0 ||
      selectedSemester.some((s) => s.value === module.semester);

    if (
      yearSelected &&
      semesterSelected &&
      (moduleSelected || programmeSelected)
    ) {
      module.totalHours.forEach((hour) => {
        let entry = data.find((e) => e.week === `Week ${hour.week}`);
        if (!entry) {
          entry = { week: `Week ${hour.week}` };
          data.push(entry);
        }
        if (moduleSelected) {
          const label = module.moduleCode;
          entry[label] = (entry[label] || 0) + hour.hours;
        }
        if (programmeSelected && !moduleSelected) {
          module.programme.forEach((prog) => {
            if (selectedProgrammes.map((sp) => sp.value).includes(prog)) {
              entry[prog] = (entry[prog] || 0) + hour.hours;
            }
          });
        }
      });
    }
  });

  return data.sort(
    (a, b) => parseInt(a.week.split(" ")[1]) - parseInt(b.week.split(" ")[1])
  );
};
