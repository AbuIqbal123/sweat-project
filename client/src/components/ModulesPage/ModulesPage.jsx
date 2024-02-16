import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Button,
} from "@mui/material";
import "./ModulesPage.css";
import { useModulePage } from "./ModulePageFunctions";

function ModulesTable() {
  const {
    yearFilter,
    setYearFilter,
    semesterFilter,
    setSemesterFilter,
    coursesFilter,
    setCoursesFilter,
    filteredRows,
    canPreviewPDF,
    generatePDF,
  } = useModulePage();

  return (
    <div className="modules-container">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: 2,
        }}
      >
        <FormControl variant="filled" sx={{ minWidth: 120 }}>
          <InputLabel>Year</InputLabel>
          <Select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {[1, 2, 3].map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="filled" sx={{ minWidth: 120 }}>
          <InputLabel>Semester</InputLabel>
          <Select
            value={semesterFilter}
            onChange={(e) => setSemesterFilter(e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {["First", "Second", "Whole Session"].map((semester) => (
              <MenuItem key={semester} value={semester}>
                {semester}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="filled" sx={{ minWidth: 120 }}>
          <InputLabel>Courses</InputLabel>
          <Select
            value={coursesFilter}
            onChange={(e) => setCoursesFilter(e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {["MCR", "CSEE", "EEE", "AVS"].map((course) => (
              <MenuItem key={course} value={course}>
                {course}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <TableContainer component={Paper} className="table-container">
        <Table aria-label="modules table">
          <TableHead>
            <TableRow>
              <TableCell>Module Code</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Credit Value</TableCell>
              <TableCell>Semester</TableCell>
              <TableCell>Courses</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((module) => (
              <TableRow key={module.moduleCode}>
                <TableCell>{module.moduleCode}</TableCell>
                <TableCell>{module.moduleTitle}</TableCell>
                <TableCell>{module.moduleCredit}</TableCell>
                <TableCell>{module.moduleSemester}</TableCell>
                <TableCell>{module.courses.join(", ")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
        <Button
          variant="contained"
          color="primary"
          disabled={!canPreviewPDF}
          onClick={() => generatePDF(filteredRows)}
          style={{ marginTop: "20px" }}
        >
          Preview PDF
        </Button>
      </Box>
    </div>
  );
}

export default ModulesTable;
