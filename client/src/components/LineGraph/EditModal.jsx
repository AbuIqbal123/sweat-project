import React from "react";
import "./EditModal.css";

const EditModal = ({ onClose }) => {
  // Dummy save handler
  const handleSave = (e) => {
    e.preventDefault();
    // Logic to handle form submission will go here
    console.log("Form submitted");
    onClose(); // Close the modal after save
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">
          <h2>Edit Module Information</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <form className="modal-form" onSubmit={handleSave}>
          {/* Module Information */}
          <div className="form-section">
            <h3>Module Information</h3>
            <label htmlFor="moduleCode">Module Code:</label>
            <input
              type="text"
              id="moduleCode"
              placeholder="Enter Module Code"
            />

            <label htmlFor="moduleCredit">Module Credit:</label>
            <input
              type="text"
              id="moduleCredit"
              placeholder="Enter Module Credit"
            />

            <label htmlFor="timetabledHours">Timetabled Hours:</label>
            <input
              type="text"
              id="timetabledHours"
              placeholder="Enter Timetabled Hours"
            />
          </div>

          {/* Teaching Schedule */}
          <div className="form-section">
            <h3>Teaching Schedule</h3>
            <label htmlFor="lectures">Lectures:</label>
            <input
              type="text"
              id="lectures"
              placeholder="Enter number of lectures"
            />

            <label htmlFor="seminars">Seminars:</label>
            <input
              type="text"
              id="seminars"
              placeholder="Enter number of seminars"
            />

            <label htmlFor="tutorials">Tutorials:</label>
            <input
              type="text"
              id="tutorials"
              placeholder="Enter number of tutorials"
            />

            {/* More fields for Labs, Fieldwork, etc. */}
          </div>

          {/* Assessments */}
          <div className="form-section">
            <h3>Assessments</h3>
            <label htmlFor="assessmentType">Assessment Type:</label>
            <select id="assessmentType">
              <option value="exam">Exam</option>
              <option value="coursework">Coursework</option>
              {/* Other assessment types */}
            </select>

            <label htmlFor="weightage">Weightage (%):</label>
            <input type="text" id="weightage" placeholder="Enter Weightage" />

            <label htmlFor="deadline">Deadline (Week):</label>
            <input type="text" id="deadline" placeholder="Enter Deadline" />
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
