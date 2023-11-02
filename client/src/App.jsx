import React, { useState } from "react";
import { modulesData } from "./utility/DataSchema";
import StudyHoursLineGraph from "./graph/LineGraph";
import "./App.css"; // Import your CSS file for styling

function App() {
  const [selectedModule, setSelectedModule] = useState("ELEC320");

  const handleModuleChange = (event) => {
    setSelectedModule(event.target.value);
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>SWEAT Project</h1>
        <select value={selectedModule} onChange={handleModuleChange}>
          <option value="ELEC320">ELEC320</option>
          <option value="ELEC362">ELEC362</option>
        </select>
      </div>
      <div className="line-graph">
        <StudyHoursLineGraph moduleData={modulesData[selectedModule]} />
      </div>
    </div>
  );
}

export default App;
