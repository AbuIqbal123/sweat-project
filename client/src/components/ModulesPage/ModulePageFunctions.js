import { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

export function useModulePage() {
  // State for storing module data
  const [modules, setModules] = useState([]);

  // State for filter values
  const [yearFilter, setYearFilter] = useState("");
  const [semesterFilter, setSemesterFilter] = useState("");
  const [coursesFilter, setCoursesFilter] = useState("");

  // Fetch modules data from the backend
  useEffect(() => {
    axios
      .get("http://localhost:8000/getModules")
      .then((response) => {
        const data = response.data;
        if (Array.isArray(data)) {
          setModules(data);
          console.log("Fetched modules:", data);
        } else {
          console.error("Fetched data is not an array:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching modules:", error);
      });
  }, []);

  // Filtered rows based on selections
  const filteredRows = modules.filter((module) => {
    // Extract the first digit from the moduleCode to determine the year
    const yearMatch = module.moduleCode.match(/\d/); // Find the first digit in the moduleCode
    const moduleYear = yearMatch ? parseInt(yearMatch[0], 10) : null;

    // Check if the module's year matches the yearFilter (if yearFilter is not the empty string "")
    const yearCondition = yearFilter
      ? moduleYear === parseInt(yearFilter, 10)
      : true;

    // Check if the module's semester matches the semesterFilter
    const semesterCondition = semesterFilter
      ? module.moduleSemester.toLowerCase() === semesterFilter.toLowerCase()
      : true;

    // Check if the module's courses include the coursesFilter
    const coursesCondition = coursesFilter
      ? module.courses.includes(coursesFilter)
      : true;

    return yearCondition && semesterCondition && coursesCondition;
  });

  const canPreviewPDF =
    yearFilter !== "" && semesterFilter !== "" && coursesFilter !== "";

  const generatePDF = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      format: "a3",
    });

    doc.setFontSize(10);
    doc.text("Module Data Calendar", 10, 10);

    filteredRows.forEach((moduleData, index) => {
      const tableColumns = [
        "Module Code",
        ...Array.from({ length: 15 }, (_, i) => `Week ${i + 1}`),
      ];
      const moduleRow = new Array(16).fill("");
      moduleRow[0] = moduleData.moduleCode;

      // Assuming moduleData.coursework and its structure
      moduleData.coursework.forEach((cw) => {
        const deadlineWeek = cw.deadline - 1;
        if (deadlineWeek >= 0 && deadlineWeek < 15) {
          moduleRow[deadlineWeek + 1] = `Assessment Type: ${
            cw.assessmentType
          }\nRecommended Study Hours: ${cw.studyHours.toFixed(2)}\nWeightage: ${
            cw.weightage
          }%`;
        }
      });

      const tableData = [moduleRow];

      if (index > 0) {
        doc.addPage();
      }

      doc.autoTable({
        head: [tableColumns],
        body: tableData,
        theme: "grid",
        styles: { fontSize: 9 },
        startY: doc.lastAutoTable.finalY ? doc.lastAutoTable.finalY + 10 : 20,
      });
    });

    doc.output("dataurlnewwindow");
  };

  return {
    yearFilter,
    setYearFilter,
    semesterFilter,
    setSemesterFilter,
    coursesFilter,
    setCoursesFilter,
    filteredRows,
    canPreviewPDF,
    generatePDF,
  };
}
