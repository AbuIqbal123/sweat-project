import React, { useEffect, useState } from "react";

function EditModuleModal({ isOpen, onClose, moduleData }) {
  console.log("moduleData", moduleData); 
  const [formFields, setFormFields] = useState({
    moduleCode: "",
    moduleCredit: 0,
    totalStudyHours: 0,
    timetabledHours: 0,
    privateStudyHours: 0,
    lecturesTotalHours: 0,
    seminarsTotalHours: 0,
    tutorialsTotalHours: 0,
    fieldworkPlacementTotalHours: 0,
    otherTotalHours: 0,
    assessments: [],
  });

  useEffect(() => {
    if (moduleData) {
      const calculateTotalHours = (items) =>
        Math.round(items.reduce((total, item) => total + item.hours, 0));

      setFormFields({
        moduleCode: moduleData.moduleCode || "",
        moduleCredit: moduleData.moduleCredit || 0,
        totalStudyHours: moduleData.totalStudyHours || 0,
        timetabledHours: moduleData.timetabledHours || 0,
        privateStudyHours: moduleData.privateStudyHours || 0,
        lecturesTotalHours: calculateTotalHours(moduleData.lectures),
        seminarsTotalHours: calculateTotalHours(moduleData.seminars),
        tutorialsTotalHours: calculateTotalHours(moduleData.tutorials),
        fieldworkPlacementTotalHours: calculateTotalHours(
          moduleData.fieldworkPlacement
        ),
        otherTotalHours: calculateTotalHours(moduleData.other),
        assessments: moduleData.coursework || [],
      });
    }
  }, [moduleData]);

  const handleAssessmentChange = (index, field, value) => {
    const updatedAssessments = formFields.assessments.map((assessment, i) =>
      i === index ? { ...assessment, [field]: value } : assessment
    );
    setFormFields({ ...formFields, assessments: updatedAssessments });
  };

  const handleDeleteAssessment = (index) => {
    const filteredAssessments = formFields.assessments.filter(
      (_, i) => i !== index
    );
    setFormFields({ ...formFields, assessments: filteredAssessments });
  };

  if (!isOpen) return null;

  return (
    <div>
      <h2>Edit Module Data</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>
            Module Code:
            <input type="text" value={formFields.moduleCode} readOnly />
          </label>
        </div>
        <div>
          <label>
            Module Credits:
            <input type="number" value={formFields.moduleCredit} readOnly />
          </label>
        </div>
        <div>
          <label>
            Total Study Hours:
            <input type="number" value={formFields.totalStudyHours} readOnly />
          </label>
        </div>
        <div>
          <label>
            Timetabled Hours:
            <input type="number" value={formFields.timetabledHours} readOnly />
          </label>
        </div>
        <div>
          <label>
            Private Study Hours:
            <input
              type="number"
              value={formFields.privateStudyHours}
              readOnly
            />
          </label>
        </div>
        <div>
          <label>
            Lectures Total Hours:
            <input
              type="number"
              value={formFields.lecturesTotalHours}
              readOnly
            />
          </label>
        </div>
        <div>
          <label>
            Seminars Total Hours:
            <input
              type="number"
              value={formFields.seminarsTotalHours}
              readOnly
            />
          </label>
        </div>
        <div>
          <label>
            Tutorials Total Hours:
            <input
              type="number"
              value={formFields.tutorialsTotalHours}
              readOnly
            />
          </label>
        </div>
        <div>
          <label>
            Fieldwork Placement Total Hours:
            <input
              type="number"
              value={formFields.fieldworkPlacementTotalHours}
              readOnly
            />
          </label>
        </div>
        <div>
          <label>
            Other Total Hours:
            <input type="number" value={formFields.otherTotalHours} readOnly />
          </label>
        </div>

        <h3>Assessments</h3>
        {formFields.assessments.map((assessment, index) => (
          <div key={index}>
            <label>
              Assessment Type:
              <input
                type="text"
                value={assessment.assessmentType}
                onChange={(e) =>
                  handleAssessmentChange(index, "type", e.target.value)
                }
              />
            </label>
            <label>
              Weightage (%):
              <input
                type="number"
                value={assessment.weightage}
                onChange={(e) =>
                  handleAssessmentChange(index, "weightage", e.target.value)
                }
              />
            </label>
            <label>
              Deadline:
              <input
                type="text"
                value={assessment.deadline}
                onChange={(e) =>
                  handleAssessmentChange(index, "deadline", e.target.value)
                }
              />
            </label>
            <button type="button" onClick={() => handleDeleteAssessment(index)}>
              Delete
            </button>
          </div>
        ))}

        <button type="button" onClick={onClose}>
          Close
        </button>
      </form>
    </div>
  );
}

export default EditModuleModal;
