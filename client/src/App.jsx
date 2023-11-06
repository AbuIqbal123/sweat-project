import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import StudyHoursLineGraph from "./graph/LineGraph";

function App() {
  const [selectedModule, setSelectedModule] = useState("ELEC362");
  const [modules, setModules] = useState({});
  const [moduleData, setModuleData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/getModules")
      .then((response) => {
        console.log("Fetched modules:", response.data); // Add this log
        setModules(response.data[0]);
        // Set the default module data when the component mounts
        setModuleData(response.data[0][selectedModule]);
        console.log("Default module data:", response.data[0][selectedModule]); // Add this log
      })
      .catch((err) => console.log(err));
  }, []);

  const handleModuleChange = (event) => {
    const moduleCode = event.target.value;
    setSelectedModule(moduleCode);

    // Set the module data based on the selected module
    setModuleData(modules[moduleCode]);
    console.log("Selected module data:", modules[moduleCode]); // Add this log
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
      </div>
      <div className="line-graph">
        <StudyHoursLineGraph moduleData={moduleData} />
      </div>
    </div>
  );
}

export default App;
