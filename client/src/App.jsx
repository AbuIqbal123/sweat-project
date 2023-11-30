import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import InputForm from "./components/InputForm/InputForm";
import ModuleSelection from "./components/Buttons/ModuleSelection";
import StudyHoursLineGraph from "./components/LineGraph/LineGraph"; // Assuming the file path is correct

function App() {
  const [moduleData, setModuleData] = useState(null);
  const [selectedStudyStyle, setSelectedStudyStyle] = useState("balanced");

  return (
    <div className="app-container">
      <div className="header">
        <h1>SWEAT Project</h1>
        <ModuleSelection
          setModuleData={setModuleData}
          setSelectedStudyStyle={setSelectedStudyStyle}
        />
      </div>

      <div className="line-graph">
        <StudyHoursLineGraph
          moduleData={moduleData}
          studyStyle={selectedStudyStyle}
        />
      </div>

      <div className="input-form">
        <InputForm />
      </div>
    </div>
  );
}

export default App;
