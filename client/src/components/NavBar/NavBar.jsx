import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@mui/material";
import "./NavBar.css"; // Import the CSS file

function NavBar() {
  return (
    <AppBar position="static" className="appBar">
      <Toolbar className="toolbar">
        <Button component={Link} to="/" className="navButton">
          Home
        </Button>
        <Button component={Link} to="/modules" className="navButton">
          Modules
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
