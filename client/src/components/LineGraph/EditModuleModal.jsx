// EditModuleModal.jsx
import React from "react";
import "./EditModuleModal.css"; // Make sure to create this CSS file

function EditModuleModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <h2>Module Information</h2>
        <div className="form-section field-group">
          <div>
            <label htmlFor="moduleCode">Module Code:</label>
            <input
              type="text"
              id="moduleCode"
              placeholder="Enter Module Code"
            />
          </div>
          <div>
            <label htmlFor="moduleCredit">Module Credit:</label>
            <input
              type="text"
              id="moduleCredit"
              placeholder="Enter Module Credit"
            />
          </div>
          <div>
            <label htmlFor="timetabledHours">Timetabled Hours:</label>
            <input
              type="text"
              id="timetabledHours"
              placeholder="Enter Timetabled Hours"
            />
          </div>
        </div>

        <h2>Teaching Schedule</h2>
        <div className="form-section field-group">
          {/* ... Teaching Schedule fields ... */}
          <div className="field">
            <label htmlFor="lectures">Lectures</label>
            <input type="number" id="lectures" placeholder="Enter number" />
          </div>
          <div className="field">
            <label htmlFor="seminars">Seminars</label>
            <input type="number" id="seminars" placeholder="Enter number" />
          </div>
          <div className="field">
            <label htmlFor="tutorials">Tutorials</label>
            <input type="number" id="tutorials" placeholder="Enter number" />
          </div>
          <div className="field">
            <label htmlFor="labs">Labs</label>
            <input type="number" id="labs" placeholder="Enter number" />
          </div>
          <div className="field">
            <label htmlFor="fieldwork">Fieldwork Placement</label>
            <input type="number" id="fieldwork" placeholder="Enter number" />
          </div>
          <div className="field">
            <label htmlFor="other">Other</label>
            <input type="text" id="other" placeholder="Enter details" />
          </div>
        </div>

        <h2>Assessments</h2>
        <div className="form-section">
          <div className="field-group">
            <div>
              <label htmlFor="assessmentType">Assessment Type</label>
              <select id="assessmentType">
                <option value="exam">Exam</option>
                <option value="coursework">Coursework</option>
                <option value="classtest">Class Test</option>
                {/* Add other options here */}
              </select>
            </div>
            <div>
              <label htmlFor="weightage">Weightage (%)</label>
              <input
                type="number"
                id="weightage"
                placeholder="Enter Weightage"
              />
            </div>
            <div>
              <label htmlFor="deadline">Deadline (Week)</label>
              <input type="number" id="deadline" placeholder="Enter Deadline" />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button className="add-assessment">Add Assessment</button>
          <button className="save-data">Save All Data</button>
        </div>
      </div>
    </div>
  );
}

export default EditModuleModal;
