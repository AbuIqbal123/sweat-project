import React from "react";
import "./EditButton.css";

const EditButton = ({ onEditClick }) => {
  return (
    <button className="edit-button" onClick={onEditClick}>
      Edit
    </button>
  );
};

export default EditButton;
