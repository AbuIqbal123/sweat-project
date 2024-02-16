import React, { useState, useEffect } from "react";
import "./HomePage.css";
import InputForm from "../InputForm/InputForm";
import ModuleSelection from "../Buttons/ModuleSelection";
import StudyHoursLineGraph from "../LineGraph/LineGraph";
import ExportPDFButton from "../ExportPDF/ExportPDF";
import axios from "axios";
import { Box, ButtonGroup, Button } from "@mui/material";

function App() {
  const [moduleData, setModuleData] = useState(null);
  const [selectedStudyStyle, setSelectedStudyStyle] = useState("balanced");
  const [selectedModule, setSelectedModule] = useState("");
  const [userRole, setUserRole] = useState("Student");

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

  const isSelected = (role) => userRole === role;

  return (
    <Box className="app-container" sx={{ padding: 2 }}>
      <Box sx={{ marginBottom: 4 }}>
        <h1>SWEAT Project</h1>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
          sx={{ marginTop: 2 }}
        >
          {["Student", "Admin"].map((role) => (
            <Button
              key={role}
              onClick={() => setUserRole(role)}
              variant={isSelected(role) ? "contained" : "outlined"}
              sx={{
                backgroundColor: isSelected(role)
                  ? "primary.main"
                  : "transparent",
                color: isSelected(role) ? "#fff" : "primary.main",
                borderColor: "primary.main",
                "&:hover": {
                  backgroundColor: isSelected(role)
                    ? "primary.dark"
                    : "transparent",
                  color: isSelected(role) ? "#fff" : "primary.dark",
                },
              }}
            >
              {role}
            </Button>
          ))}
        </ButtonGroup>
      </Box>
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
      {userRole === "Admin" && (
        <Box sx={{ marginBottom: 4 }}>
          <InputForm />
        </Box>
      )}
    </Box>
  );
}

export default App;
