import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import "./NavBar.css"; 

const toTitleCase = (str) => {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
};

const NavBar = ({ userRole, setUserRole }) => {
  const handleChange = (event) => {
    setUserRole(event.target.value);
  };

  return (
    <AppBar position="static" className="navBar">
      <Toolbar className="toolbar">
        <div className="navLinks">
          <NavLink to="/" className="navLink" activeClassName="active">
            {toTitleCase("home")}
          </NavLink>
          <NavLink
            to="/simulations"
            className="navLink"
            activeClassName="active"
          >
            {toTitleCase("simulations")}
          </NavLink>
          <NavLink to="/modules" className="navLink" activeClassName="active">
            {toTitleCase("modules")}
          </NavLink>
          <NavLink
            to="/input-modules"
            className="navLink"
            activeClassName="active"
          >
            {toTitleCase("input modules")}
          </NavLink>
        </div>
        <div className="selectRole">
          <FormControl variant="standard" sx={{ minWidth: 120 }}>
            <InputLabel id="role-select-label" className="roleLabel">
              Role
            </InputLabel>
            <Select
              labelId="role-select-label"
              id="role-select"
              value={userRole}
              onChange={handleChange}
              label="Role"
              sx={{ fontFamily: "Montserrat, sans-serif" }}
            >
              <MenuItem value="Student">Student</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
            </Select>
          </FormControl>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
