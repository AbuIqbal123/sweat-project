import React, { useState } from "react";
import axios from "axios";
import "./InputForm.css";

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
  const [weightage, setWeightage] = useState("");
  const [error, setError] = useState("");
  const [assessments, setAssessments] = useState([
    {
      assessmentType: "",
      deadline: "",
      weightage: "",
      distribution: [],
    },
  ]);

  const addAssessment = () => {
    setAssessments((prevAssessments) => [
      ...prevAssessments,
      {
        deadline: "",
        weightage: "",
        distribution: [],
      },
    ]);
  };

  const deleteAssessment = (index) => {
    setAssessments((prevAssessments) =>
      prevAssessments.filter((_, i) => i !== index)
    );
  };

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
    console.log("Values:", {
      moduleCode,
      moduleCredit,
      timetabledHours,
      lectures,
      seminars,
      tutorial,
      labs,
      fieldworkPlacement,
      other,
      assessments,
    });

    // Validation logic for the individual assessments
    const assessmentsValid = assessments.every((assessment) => {
      return (
        assessment.assessmentType && assessment.weightage && assessment.deadline
      );
    });

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
      !assessmentsValid
    ) {
      setError("All fields are required in assessments.");
      return false;
    }
    return true;
  };

  const handleWeightageInputChange = (event, index) => {
    const { value } = event.target;
    const updatedAssessments = [...assessments];
    updatedAssessments[index].weightage = value;
    setAssessments(updatedAssessments);
  };

  const handleAssessmentTypeInputChange = (event, index) => {
    const { value } = event.target;
    const updatedAssessments = [...assessments];
    updatedAssessments[index].assessmentType = value;
    setAssessments(updatedAssessments);
  };

  const handleDeadlineInputChange = (event, index) => {
    const { value } = event.target;
    const updatedAssessments = [...assessments];
    updatedAssessments[index].deadline = value;
    setAssessments(updatedAssessments);
  };

  const handleSubmit = async () => {
    setError("");

    console.log("Values:", {
      moduleCode,
      moduleCredit,
      timetabledHours,
      lectures,
      seminars,
      tutorial,
      labs,
      fieldworkPlacement,
      other,
      assessments,
    });

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
              assessments,
            },
          ]
        );
        if (response.status === 200) {
          window.location.reload();
        }
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

  return (
    <div className="form-container">
      {error && <div className="error">{error}</div>}
      <h2>Module Information</h2>
      <div className="input-group">
        <div className="input-wrapper">
          <label htmlFor="moduleCode">Module Code:</label>
          <input
            type="text"
            id="moduleCode"
            value={moduleCode}
            onChange={handleModuleCodeChange}
            placeholder="Enter Module Code"
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="moduleCredit">Module Credit:</label>
          <input
            type="number"
            id="moduleCredit"
            value={moduleCredit}
            onChange={handleModuleCreditChange}
            placeholder="Enter Module Credit"
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="timetabledHours">Timetabled Hours:</label>
          <input
            type="number"
            id="timetabledHours"
            value={timetabledHours}
            onChange={handleTimetabledHoursChange}
            placeholder="Enter Timetabled Hours"
          />
        </div>
      </div>

      <h2>Teaching Schedule</h2>
      <table>
        <thead>
          <tr>
            <th>Lectures</th>
            <th>Seminars</th>
            <th>Tutorials</th>
            <th>Labs</th>
            <th>Fieldwork Placement</th>
            <th>Other</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type="number"
                value={lectures}
                onChange={handleLecturesChange}
                placeholder="Enter number of Lectures"
              />
            </td>
            <td>
              <input
                type="number"
                value={seminars}
                onChange={handleSeminarsChange}
                placeholder="Enter number of Seminars"
              />
            </td>
            <td>
              <input
                type="number"
                value={tutorial}
                onChange={handleTutorialChange}
                placeholder="Enter number of Tutorials"
              />
            </td>
            <td>
              <input
                type="number"
                value={labs}
                onChange={handleLabsChange}
                placeholder="Enter number of Labs"
              />
            </td>
            <td>
              <input
                type="number"
                value={fieldworkPlacement}
                onChange={handleFieldworkPlacementChange}
                placeholder="Enter Fieldwork Placement"
              />
            </td>
            <td>
              <input
                type="number"
                value={other}
                onChange={handleOtherChange}
                placeholder="Enter Other"
              />
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Assessments</h2>
      <table>
        <thead>
          <tr>
            <th>Assessment Type</th>
            <th>Weightage (%)</th>
            <th>Deadline (Week)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assessments.map((assessment, index) => (
            <tr key={index}>
              <td>
                <select
                  value={assessment.assessmentType}
                  onChange={(event) =>
                    handleAssessmentTypeInputChange(event, index)
                  }
                >
                  <option value="exam">Exam</option>
                  <option value="coursework">Coursework</option>
                  <option value="classTest">Class Test</option>
                </select>
              </td>
              <td>
                <input
                  type="number"
                  value={assessment.weightage}
                  onChange={(event) => handleWeightageInputChange(event, index)}
                  placeholder="Enter Weightage"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={assessment.deadline}
                  onChange={(event) => handleDeadlineInputChange(event, index)}
                  placeholder="Enter Deadline"
                />
              </td>
              <td>
                <button onClick={() => deleteAssessment(index)}>Delete</button>
                <button>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={addAssessment}>Add Assessment</button>
      <button onClick={handleSubmit}>Save All Data</button>
    </div>
  );
};

export default InputForm;
