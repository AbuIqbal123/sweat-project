import React, { useState, useEffect } from "react";
import axios from "axios";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const ModuleSelection = ({
  setModuleData,
  setSelectedStudyStyle,
  setSelectedModule,
  handleDocumentUpdate,
}) => {
  const [selectedModule, setSelectedModuleLocal] = useState(""); // Local state to track the selected module code
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
    <div className="module-selection">
      <div className="header">
        <FormControl>
          <InputLabel id="module-select-label">Select Module</InputLabel>
          <Select
            labelId="module-select-label"
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
        <FormControl>
          <InputLabel id="style-select-label">Select Study Style</InputLabel>
          <Select
            labelId="style-select-label"
            value={selectedStudyStyle}
            onChange={handleStudyStyleChange}
          >
            <MenuItem value="balanced">Balanced</MenuItem>
            <MenuItem value="procrastinator">Procrastinator</MenuItem>
            <MenuItem value="earlybird">Early Bird</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default ModuleSelection;
