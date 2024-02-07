import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import InputForm from "./components/InputForm/InputForm";
import ModuleSelection from "./components/Buttons/ModuleSelection";
import StudyHoursLineGraph from "./components/LineGraph/LineGraph"; // Assuming the file path is correct
import axios from "axios";
function App() {
  const [moduleData, setModuleData] = useState(null);
  const [selectedStudyStyle, setSelectedStudyStyle] = useState("balanced");
  const [selectedModule, setSelectedModule] = useState("");

  const handleDocumentUpdate = (selectedModule) => {
    console.log("Attempting to fetch data for module:", selectedModule); // Debug log
    axios
      .get(`http://localhost:8000/getModule/${selectedModule}`)
      .then((response) => {
        console.log(
          `Data fetched for module: ${selectedModule}`,
          response.data
        );
        setModuleData(response.data);
      })
      .catch((error) => console.error("Failed to fetch module data:", error));
  };

  // In App.js
  useEffect(() => {
    if (selectedModule) {
      console.log("Selected Module in App:", selectedModule); // Ensure this logs the correct value
      handleDocumentUpdate(selectedModule);
    }
  }, [selectedModule]);

  return (
    <div className="app-container">
      <div className="header">
        <h1>SWEAT Project</h1>
        <ModuleSelection
          setModuleData={setModuleData}
          setSelectedStudyStyle={setSelectedStudyStyle}
          setSelectedModule={setSelectedModule}
          handleDocumentUpdate={handleDocumentUpdate}
        />
      </div>

      <div className="line-graph">
        <StudyHoursLineGraph
          moduleData={moduleData}
          studyStyle={selectedStudyStyle}
          handleDocumentUpdate={handleDocumentUpdate}
        />
      </div>

      <div className="input-form">
        <InputForm />
      </div>
    </div>
  );
}

export default App;
