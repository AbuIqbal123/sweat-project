import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import "./LandingPage.css"; // Import the CSS file

const LandingPage = () => {
  return (
    <div className="container">
      <h1 className="heading">Student Workload Impact Evaluation Tool</h1>
      <p className="description">
        This tool helps evaluate student workload impact.
      </p>
      <div className="buttonContainer">
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/simulations"
          className="button"
        >
          Simulations
        </Button>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/modules"
          className="button"
        >
          Modules
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
