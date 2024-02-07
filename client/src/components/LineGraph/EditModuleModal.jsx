import React, { useEffect, useState } from "react";
import "./EditModuleModal.css";
import axios from "axios";

function EditModuleModal({ isOpen, onClose, moduleData, onDataUpdate }) {
  const [formFields, setFormFields] = useState({
    moduleCode: "",
    moduleCredit: 0,
    totalStudyHours: 0,
    timetabledHours: 0,
    privateStudyHours: 0,
    lecturesTotalHours: 0,
    seminarsTotalHours: 0,
    tutorialsTotalHours: 0,
    labsTotalHours: 0,
    fieldworkPlacementTotalHours: 0,
    otherTotalHours: 0,
    assessments: [
      {
        assessmentType: "",
        deadline: "",
        weightage: "",
        distribution: [],
      },
    ],
  });

  const [error, setError] = useState("");
  const [dataUpdated, setDataUpdated] = useState(false);

  useEffect(() => {
    if (moduleData && moduleData.coursework) {
      const calculateTotalHours = (items) =>
        Math.round(items.reduce((total, item) => total + item.hours, 0));

      const mapAssessmentTypeToOption = (type) => {
        // Check if type is undefined or null before proceeding
        if (!type) {
          return "Exam"; // Return a default value or handle this scenario as needed
        }

        switch (type.toLowerCase()) {
          case "exam":
            return "Exam";
          case "coursework":
            return "Coursework";
          default:
            return "Exam"; // Default case if type is unrecognized
        }
      };

      const initializedAssessments = moduleData.coursework.map(
        (assessment) => ({
          ...assessment,
          type: mapAssessmentTypeToOption(assessment.assessmentType),
        })
      );

      setFormFields((prevState) => ({
        ...prevState,
        moduleCode: moduleData.moduleCode || "",
        moduleCredit: moduleData.moduleCredit || 0,
        totalStudyHours: moduleData.totalStudyHours || 0,
        timetabledHours: moduleData.timetabledHours || 0,
        privateStudyHours: moduleData.privateStudyHours || 0,
        lecturesTotalHours: calculateTotalHours(moduleData.lectures),
        seminarsTotalHours: calculateTotalHours(moduleData.seminars),
        tutorialsTotalHours: calculateTotalHours(moduleData.tutorials),
        labsTotalHours: calculateTotalHours(moduleData.labs),
        fieldworkPlacementTotalHours: calculateTotalHours(
          moduleData.fieldworkPlacement
        ),
        otherTotalHours: calculateTotalHours(moduleData.other),
        assessments: initializedAssessments,
      }));
    }
  }, [moduleData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const addAssessment = () => {
    setFormFields((prevFields) => ({
      ...prevFields,
      assessments: [
        ...prevFields.assessments,
        { assessmentType: "", deadline: "", weightage: "", distribution: [] },
      ],
    }));
  };

  const deleteAssessment = (index) => {
    setFormFields((prevFields) => ({
      ...prevFields,
      assessments: prevFields.assessments.filter((_, i) => i !== index),
    }));
  };

  const handleAssessmentChange = (index, field, value) => {
    setFormFields((prevFields) => ({
      ...prevFields,
      assessments: prevFields.assessments.map((assessment, i) =>
        i === index ? { ...assessment, [field]: value } : assessment
      ),
    }));
  };

  const handleSubmit = async () => {
    setError(""); // Assuming you have similar validation functions in place
    const updatedModuleData = {
      // Construct the data object from state
      moduleCode: formFields.moduleCode,
      moduleCredit: formFields.moduleCredit,
      timetabledHours: formFields.timetabledHours,
      lectures: formFields.lecturesTotalHours, // Adapt based on your state structure
      seminars: formFields.seminarsTotalHours,
      tutorial: formFields.tutorialsTotalHours,
      labs: formFields.labsTotalHours,
      fieldworkPlacement: formFields.fieldworkPlacementTotalHours,
      other: formFields.otherTotalHours,
      assessments: formFields.assessments,
      _id: moduleData._id, // Include the document's unique identifier
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/transformData",
        [updatedModuleData] // Send data as an array if that's what your backend expects
      );
      if (response.status === 200) {
        setDataUpdated(true);
        onClose();
        // Optionally, use a more controlled approach instead of reloading
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
  };

  if (!isOpen) return null;

  return (
    <div className="edit-module-modal">
      <h2 className="modal-title">Edit Module Data</h2>
      <form className="modal-form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-row">
          <label>
            Module Code:
            <input
              className="input-field"
              type="text"
              name="moduleCode"
              value={formFields.moduleCode}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Module Credit:
            <input
              className="input-field"
              type="number"
              name="moduleCredit"
              value={formFields.moduleCredit}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Timetabled Hours:
            <input
              className="input-field"
              type="number"
              name="timetabledHours"
              value={formFields.timetabledHours}
              onChange={handleInputChange}
            />
          </label>
        </div>

        <div className="section-heading">Teaching Schedule</div>
        <div className="form-row">
          <label>
            Lectures:
            <input
              className="input-field"
              type="number"
              name="lecturesTotalHours"
              value={formFields.lecturesTotalHours}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Seminars:
            <input
              className="input-field"
              type="number"
              name="seminarsTotalHours"
              value={formFields.seminarsTotalHours}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Tutorials:
            <input
              className="input-field"
              type="number"
              name="tutorialsTotalHours"
              value={formFields.tutorialsTotalHours}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Labs:
            <input
              className="input-field"
              type="number"
              name="labsTotalHours"
              value={formFields.labsTotalHours}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Fieldwork Placement:
            <input
              className="input-field"
              type="number"
              name="fieldworkPlacementTotalHours"
              value={formFields.fieldworkPlacementTotalHours}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Other:
            <input
              className="input-field"
              type="number"
              name="otherTotalHours"
              value={formFields.otherTotalHours}
              onChange={handleInputChange}
            />
          </label>
        </div>

        <div className="section-heading">Assessments</div>
        {formFields.assessments.map((assessment, index) => (
          <div key={index} className="form-row">
            <label>
              Assessment Type:
              <select
                className="input-field"
                value={assessment.type} // Ensure this matches your state's field
                onChange={(e) =>
                  handleAssessmentChange(
                    index,
                    "assessmentType",
                    e.target.value
                  )
                }
              >
                <option value="Coursework">Coursework</option>
                <option value="Exam">Exam</option>
              </select>
            </label>
            <label>
              Weightage
              <input
                className="input-field"
                type="number"
                value={assessment.weightage}
                placeholder="Weightage (%)"
                onChange={(e) =>
                  handleAssessmentChange(index, "weightage", e.target.value)
                }
              />
            </label>
            <label>
              Deadline
              <input
                className="input-field"
                type="text"
                value={assessment.deadline}
                placeholder="Deadline"
                onChange={(e) =>
                  handleAssessmentChange(index, "deadline", e.target.value)
                }
              />
            </label>
            <button
              className="action-btn delete-btn"
              onClick={() => deleteAssessment(index)}
            >
              Delete
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addAssessment}
          className="action-btn add-btn"
        >
          Add Assessment
        </button>

        <div className="form-actions">
          <button className="save-btn" type="submit" onClick={handleSubmit}>
            Save All Data
          </button>
          <button className="close-btn" type="button" onClick={onClose}>
            Close
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditModuleModal;
