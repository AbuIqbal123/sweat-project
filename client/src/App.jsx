import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import StudyHoursLineGraph from "./graph/LineGraph";

function App() {
  const [selectedModule, setSelectedModule] = useState("ELEC362");
  const [selectedStudyStyle, setSelectedStudyStyle] = useState("balanced");
  const [modules, setModules] = useState({});
  const [moduleData, setModuleData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/getModules")
      .then((response) => {
        console.log("Fetched modules:", response.data);
        setModules(response.data[0]);
        setModuleData(response.data[0][selectedModule]);
        console.log("Default module data:", response.data[0][selectedModule]);
      })
      .catch((err) => console.log(err));
  }, [selectedModule]);

  useEffect(() => {
    // Update the graph whenever selectedStudyStyle changes
    setModuleData(modules[selectedModule]);
  }, [selectedStudyStyle, modules, selectedModule]);

  const handleModuleChange = (event) => {
    const moduleCode = event.target.value;
    setSelectedModule(moduleCode);
    setModuleData(modules[moduleCode]);
    console.log("Selected module data:", modules[moduleCode]);
  };

  const handleStudyStyleChange = (event) => {
    const style = event.target.value;
    setSelectedStudyStyle(style);
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>SWEAT Project</h1>
        <select value={selectedModule} onChange={handleModuleChange}>
          {Object.keys(modules).map((moduleCode) => (
            <option key={moduleCode} value={moduleCode}>
              {moduleCode}
            </option>
          ))}
        </select>

        <select value={selectedStudyStyle} onChange={handleStudyStyleChange}>
          <option value="balanced">Balanced</option>
          <option value="procrastinator">Procrastinator</option>
          <option value="earlybird">Early Bird</option>
        </select>
      </div>

      <div className="line-graph">
        {/* Pass the selectedStudyStyle as a prop to StudyHoursLineGraph */}
        <StudyHoursLineGraph
          moduleData={moduleData}
          studyStyle={selectedStudyStyle}
        />
      </div>
    </div>
  );
}

export default App;
