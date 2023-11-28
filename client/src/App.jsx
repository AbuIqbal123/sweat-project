import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import StudyHoursLineGraph from "./components/LineGraph/LineGraph";
import InputForm from "./components/InputForm/InputForm";

function App() {
  const [selectedModule, setSelectedModule] = useState("ELEC362");
  const [selectedStudyStyle, setSelectedStudyStyle] = useState("balanced");
  const [modules, setModules] = useState({});
  const [moduleData, setModuleData] = useState(null);
  const [shouldReRender, setShouldReRender] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/getModules")
      .then((response) => {
        const data = response.data[0];
        setModules(data);
        setModuleData(data[selectedModule]);
      })
      .catch((err) => console.log(err));
  }, [selectedModule]);

  useEffect(() => {
    if (modules[selectedModule]) {
      setModuleData(modules[selectedModule]);
    }
  }, [selectedStudyStyle, modules, selectedModule]);

  useEffect(() => {
    setShouldReRender((prev) => !prev);
  }, [selectedModule, selectedStudyStyle]);

  const handleModuleChange = (event) => {
    const moduleCode = event.target.value;
    setSelectedModule(moduleCode);
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
        <StudyHoursLineGraph
          key={shouldReRender}
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
