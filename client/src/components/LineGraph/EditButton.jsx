// EditButton.jsx
import React from "react";
import "./EditButton.css"; // Assuming this file contains the appropriate styles

function EditButton({ onClick }) {
  return (
    <button onClick={onClick} className="edit-button">
      Edit Module Components
    </button>
  );
}

export default EditButton;
