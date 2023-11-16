// InputForm.jsx
import React, { useState } from "react";
import axios from "axios"; // for making HTTP requests
import "./InputForm.css"; // import the CSS file

const InputForm = () => {
  const [moduleCode, setModuleCode] = useState("");
  const [moduleCredit, setModuleCredit] = useState("");
  const [timetabledHours, setTimetabledHours] = useState("");
  const [lectures, setLectures] = useState("");
  const [seminars, setSeminars] = useState("");
  const [tutorial, setTutorial] = useState("");
  const [labs, setLabs] = useState("");
  const [fieldworkPlacement, setFieldworkPlacement] = useState("");
  const [other, setOther] = useState("");
  const [assessmentType, setAssessmentType] = useState("");
  const [weightage, setWeightage] = useState("");
  const [deadline, setDeadline] = useState("");
  const [error, setError] = useState("");

  const handleModuleCodeChange = (event) => {
    setModuleCode(event.target.value);
  };

  const handleModuleCreditChange = (event) => {
    setModuleCredit(event.target.value);
  };

  const handleTimetabledHoursChange = (event) => {
    setTimetabledHours(event.target.value);
  };

  const handleLecturesChange = (event) => {
    setLectures(event.target.value);
  };

  const handleSeminarsChange = (event) => {
    setSeminars(event.target.value);
  };

  const handleTutorialChange = (event) => {
    setTutorial(event.target.value);
  };

  const handleLabsChange = (event) => {
    setLabs(event.target.value);
  };

  const handleFieldworkPlacementChange = (event) => {
    setFieldworkPlacement(event.target.value);
  };

  const handleOtherChange = (event) => {
    setOther(event.target.value);
  };

  const handleAssessmentTypeChange = (event) => {
    setAssessmentType(event.target.value);
  };

  const handleWeightageChange = (event) => {
    setWeightage(event.target.value);
  };

  const handleDeadlineChange = (event) => {
    setDeadline(event.target.value);
  };

  const validateHours = () => {
    const totalHours =
      parseInt(lectures) +
      parseInt(seminars) +
      parseInt(tutorial) +
      parseInt(labs) +
      parseInt(fieldworkPlacement) +
      parseInt(other);

    if (totalHours !== parseInt(timetabledHours)) {
      setError("Teaching schedule hours should add up to Timetabled Hours.");
      return false;
    }
    return true;
  };

  const validateWeightage = () => {
    const totalWeightage = parseInt(weightage);
    if (totalWeightage > 100) {
      setError("Total weightage cannot exceed 100%.");
      return false;
    }
    return true;
  };

  const validateInputs = () => {
    if (
      !moduleCode ||
      !moduleCredit ||
      !timetabledHours ||
      !lectures ||
      !seminars ||
      !tutorial ||
      !labs ||
      !fieldworkPlacement ||
      !other ||
      !assessmentType ||
      !weightage ||
      !deadline
    ) {
      setError("All fields are required.");
      return false;
    }
    return true;
  };

  // ... (previous code)

  const handleSubmit = async () => {
    setError("");

    if (validateInputs() && validateHours() && validateWeightage()) {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/transformData",
          [
            {
              moduleCode,
              moduleCredit,
              timetabledHours,
              lectures,
              seminars,
              tutorial,
              labs,
              fieldworkPlacement,
              other,
              assessmentType,
              weightage,
              deadline,
            },
          ]
        );
        // Handle success or any necessary UI updates
        console.log("Response:", response.data);
        // Example: Reset form fields
        // resetForm();
      } catch (error) {
        if (error.response) {
          setError("Failed to save data. Please try again later.");
        } else if (error.request) {
          setError("Network error. Please check your internet connection.");
        } else {
          setError("An unexpected error occurred.");
        }
      }
    }
  };

  // ... (remaining code)

  return (
    <div className="form-container">
      {error && <div className="error">{error}</div>}
      <h2>Module Information</h2>
      <label htmlFor="moduleCode">Module Code:</label>
      <input
        type="text"
        id="moduleCode"
        value={moduleCode}
        onChange={handleModuleCodeChange}
        placeholder="Enter Module Code"
      />
      <label htmlFor="moduleCredit">Module Credit:</label>
      <input
        type="number"
        id="moduleCredit"
        value={moduleCredit}
        onChange={handleModuleCreditChange}
        placeholder="Enter Module Credit"
      />
      <label htmlFor="timetabledHours">Timetabled Hours:</label>
      <input
        type="number"
        id="timetabledHours"
        value={timetabledHours}
        onChange={handleTimetabledHoursChange}
        placeholder="Enter Timetabled Hours"
      />

      <h2>Teaching Schedule</h2>
      <label htmlFor="lectures">Lectures:</label>
      <input
        type="number"
        id="lectures"
        value={lectures}
        onChange={handleLecturesChange}
        placeholder="Enter number of Lectures"
      />
      <label htmlFor="seminars">Seminars:</label>
      <input
        type="number"
        id="seminars"
        value={seminars}
        onChange={handleSeminarsChange}
        placeholder="Enter number of Seminars"
      />
      <label htmlFor="tutorial">Tutorials:</label>
      <input
        type="number"
        id="tutorial"
        value={tutorial}
        onChange={handleTutorialChange}
        placeholder="Enter number of Tutorials"
      />
      <label htmlFor="labs">Labs:</label>
      <input
        type="number"
        id="labs"
        value={labs}
        onChange={handleLabsChange}
        placeholder="Enter number of Labs"
      />
      <label htmlFor="fieldworkPlacement">Fieldwork Placement:</label>
      <input
        type="number"
        id="fieldworkPlacement"
        value={fieldworkPlacement}
        onChange={handleFieldworkPlacementChange}
        placeholder="Enter Fieldwork Placement"
      />
      <label htmlFor="other">Other:</label>
      <input
        type="number"
        id="other"
        value={other}
        onChange={handleOtherChange}
        placeholder="Enter Other"
      />

      <h2>Assessments</h2>
      <label htmlFor="assessmentType">Assessment Type:</label>
      <select
        id="assessmentType"
        value={assessmentType}
        onChange={handleAssessmentTypeChange}
      >
        <option value="">Select Type</option>
        <option value="Exam">Exam</option>
        <option value="Coursework">Coursework</option>
        <option value="Class Test">Class Test</option>
      </select>
      <label htmlFor="weightage">Weightage (%):</label>
      <input
        type="number"
        id="weightage"
        value={weightage}
        onChange={handleWeightageChange}
        placeholder="Enter Weightage (%)"
      />
      <label htmlFor="deadline">Deadline (Week):</label>
      <input
        type="number"
        id="deadline"
        value={deadline}
        onChange={handleDeadlineChange}
        placeholder="Enter Deadline (Week)"
      />

      <button onClick={handleSubmit}>Save All Data</button>
    </div>
  );
};

export default InputForm;
