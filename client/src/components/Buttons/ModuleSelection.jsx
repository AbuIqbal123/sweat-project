import React, { useState, useEffect } from "react";
import axios from "axios";
import { Select, MenuItem, FormControl, InputLabel, Typography, Box } from "@mui/material";
import "./ModuleSelection.css"; // Import CSS file for styling

const ModuleSelection = ({
  setModuleData,
  setSelectedStudyStyle,
  setSelectedModule,
  handleDocumentUpdate,
}) => {
  const [selectedModule, setSelectedModuleLocal] = useState("ELEC191"); // Local state to track the selected module code
  const [selectedStudyStyle, setSelectedStudyStyleLocal] = useState("balanced");
  const [modules, setModules] = useState([]);
  const [moduleData, setLocalModuleData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/getModules")
      .then((response) => {
        const data = response.data;
        if (Array.isArray(data)) {
          setModules(data);
          if (data.length > 0) {
            setSelectedModule(data[0].moduleCode);
          }
        } else {
          console.error("Fetched data is not an array:", data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (
      modules.length > 0 &&
      modules.find((module) => module.moduleCode === selectedModule)
    ) {
      const selectedModuleObject = modules.find(
        (module) => module.moduleCode === selectedModule
      );

      setLocalModuleData(selectedModuleObject);
      setModuleData(selectedModuleObject); // Pass moduleData up to App component
    } else {
      console.log("Module not found or modules list is empty.");
    }
  }, [selectedModule, selectedStudyStyle, modules, setModuleData, setModules]);

  const handleModuleChange = (event) => {
    const moduleCode = event.target.value;
    setSelectedModuleLocal(moduleCode); // Update local state
    setSelectedModule(moduleCode); // Update parent's selectedModule state
    handleDocumentUpdate(moduleCode); // Attempting to fetch data right after state update may be premature
  };

  const handleStudyStyleChange = (event) => {
    const style = event.target.value;
    setSelectedStudyStyle(style);
    setSelectedStudyStyleLocal(style); // Update local state for selectedStudyStyle
  };

  return (
    <div className="module-selection-container">
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
        <div>
          <Typography variant="subtitle1" color="textPrimary">
            Select Module:
          </Typography>
          <FormControl>
            <Select
              value={selectedModule}
              onChange={handleModuleChange}
            >
              {modules.map((module) => (
                <MenuItem key={module._id} value={module.moduleCode}>
                  {module.moduleCode}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <Typography variant="subtitle1" color="textPrimary">
            Select Study Style:
          </Typography>
          <FormControl>
            <Select
              value={selectedStudyStyle}
              onChange={handleStudyStyleChange}
            >
              <MenuItem value="balanced">Balanced</MenuItem>
              <MenuItem value="procrastinator">Procrastinator</MenuItem>
              <MenuItem value="earlybird">Early Bird</MenuItem>
            </Select>
          </FormControl>
        </div>
      </Box>
    </div>
  );
};

export default ModuleSelection;
