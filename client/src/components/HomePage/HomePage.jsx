import React, { useState, useEffect } from "react";
import "./HomePage.css";
import InputForm from "../InputForm/InputForm";
import ModuleSelection from "../Buttons/ModuleSelection";
import StudyHoursLineGraph from "../LineGraph/LineGraph";
import ExportPDFButton from "../ExportPDF/ExportPDF";
import axios from "axios";
import { Box } from "@mui/material";

function HomePage({ userRole }) {
  const [moduleData, setModuleData] = useState(null);
  const [selectedStudyStyle, setSelectedStudyStyle] = useState("balanced");
  const [selectedModule, setSelectedModule] = useState("");

  const handleDocumentUpdate = (selectedModule) => {
    axios
      .get(`http://localhost:8000/getModule/${selectedModule}`)
      .then((response) => {
        setModuleData(response.data);
      })
      .catch((error) => console.error("Failed to fetch module data:", error));
  };

  useEffect(() => {
    if (selectedModule) {
      handleDocumentUpdate(selectedModule);
    }
  }, [selectedModule]);

  return (
    <Box className="app-container" sx={{ padding: 2 }}>
      <Box sx={{ marginX: 2, marginBottom: 4 }}>
        <ModuleSelection
          setModuleData={setModuleData}
          setSelectedStudyStyle={setSelectedStudyStyle}
          setSelectedModule={setSelectedModule}
          handleDocumentUpdate={handleDocumentUpdate}
        />
      </Box>
      <Box sx={{ marginBottom: 4 }}>
        <StudyHoursLineGraph
          moduleData={moduleData}
          studyStyle={selectedStudyStyle}
          handleDocumentUpdate={handleDocumentUpdate}
          userRole={userRole}
          isDisabledForStudents={userRole === "Student"}
        />
      </Box>
      {moduleData && (
        <Box sx={{ marginBottom: 4 }}>
          <ExportPDFButton
            moduleData={moduleData}
            studyStyle={selectedStudyStyle}
          />
        </Box>
      )}
    </Box>
  );
}

export default HomePage;
