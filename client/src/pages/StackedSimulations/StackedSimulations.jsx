import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  Label,
} from "recharts";
import Select from "react-select";
import moduleService from "../../services/moduleService";
import {
  transformModulesData,
  programmeOptions,
  yearOptions,
  semesterOptions,
  generateRandomColor,
  programmeColors,
} from "./stackedSimulationsFunctions";
import { IconButton } from "@mui/material";
import StackedBarChartIcon from "@mui/icons-material/StackedBarChart";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";
import "./StackedSimulations.css";

const StackedSimulations = () => {
  const [modulesData, setModulesData] = useState([]);
  const [selectedProgrammes, setSelectedProgrammes] = useState([]);
  const [selectedModules, setSelectedModules] = useState([]);
  const [selectedYear, setSelectedYear] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState([]);
  const [graphType, setGraphType] = useState("bar");

  // Use useRef to maintain module colors across renders
  const moduleColors = useRef({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await moduleService.getCodes(); // Verify fetched data structure
        setModulesData(res.data);
        res.data.forEach((module) => {
          if (!moduleColors.current[module.moduleCode]) {
            moduleColors.current[module.moduleCode] = generateRandomColor();
          }
        });
      } catch (error) {
        console.error("Failed to fetch modules data:", error);
      }
    };

    fetchData();
  }, []);

  // Additionally, verify moduleOptions is correctly populated
  useMemo(() => {
    // Verify modulesData is populated
    return modulesData.map((module) => ({
      value: module.moduleCode,
      label: module.moduleCode,
    }));
  }, [modulesData]);

  const moduleOptions = useMemo(
    () =>
      modulesData.map((module) => ({
        value: module.moduleCode,
        label: module.moduleCode, // Use module code as label
      })),
    [modulesData]
  );

  const transformedData = useMemo(
    () =>
      transformModulesData(
        modulesData,
        selectedModules,
        selectedProgrammes,
        selectedYear,
        selectedSemester
      ),
    [
      modulesData,
      selectedModules,
      selectedProgrammes,
      selectedYear,
      selectedSemester,
    ]
  );

  const renderChart = () => {
    const ChartComponent = graphType === "bar" ? BarChart : AreaChart;

    return (
      <ResponsiveContainer width="100%" height={400}>
        <ChartComponent
          data={transformedData}
          margin={{ top: 40, right: 35, left: 30, bottom: 5 }}
        >
          <XAxis
            dataKey="week"
            tickFormatter={(value) => value.replace(/^Week\s/, "")}
          >
            <Label value="Week" position="insideBottom" offset={-15} />
          </XAxis>
          <YAxis
            label={{
              value: "Total Study Hours",
              angle: -90,
              position: "insideLeft",
              dy: 90,
              dx: -15,
            }}
          />
          <Tooltip />
          <Legend
            verticalAlign="bottom"
            wrapperStyle={{ position: "relative", top: "-5px" }}
          />
          {transformedData[0] &&
            Object.keys(transformedData[0])
              .filter((key) => key !== "week")
              .map((key) => {
                // Attempt to directly use programmeColors if key matches.
                let color = programmeColors[key];

                // If no direct match in programmeColors, try to extract the module code.
                if (!color) {
                  const moduleCodeMatch = key.match(/\(([^)]+)\)$/);
                  const moduleCode = moduleCodeMatch ? moduleCodeMatch[1] : key;
                  color = moduleColors.current[moduleCode] || "#F00"; // Fallback to bright color if no match found
                }

                return graphType === "bar" ? (
                  <Bar
                    key={key}
                    dataKey={key}
                    stackId="a"
                    fill={color}
                    name={key}
                  />
                ) : (
                  <Area
                    key={key}
                    dataKey={key}
                    stackId="a"
                    stroke={color}
                    fill={color}
                    name={key}
                  />
                );
              })}
        </ChartComponent>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="stacked-graph-main-container">
      <div className="stacked-graph-area-container">
        <h1 className="stacked-graph-heading">Stacked Graph</h1>
        <div className="stacked-graph-chart-area">
          <div className="stacked-graph-responsive-container chart">
            {renderChart()}
          </div>
        </div>
      </div>
      <div className="stacked-graph-insights-container">
        <h2 className="stacked-graph-subheading">Insights</h2>
        <div className="stacked-graph-chart-type-selector">
          <label className="stacked-graph-label">Graph Type</label>
          <div className="graph-type-icons">
            <IconButton
              className={`graph-type-icon ${
                graphType === "bar" ? "active" : ""
              }`}
              onClick={() => setGraphType("bar")}
              style={{
                marginRight: "10px",
                backgroundColor:
                  graphType === "bar" ? "#007bff" : "transparent",
              }}
            >
              <StackedBarChartIcon
                sx={{
                  color: graphType === "bar" ? "#fff" : "#000",
                  fontSize: 50,
                }}
              />
            </IconButton>
            <IconButton
              className={`graph-type-icon ${
                graphType === "line" ? "active" : ""
              }`}
              onClick={() => setGraphType("line")}
              style={{
                backgroundColor:
                  graphType === "line" ? "#007bff" : "transparent",
              }}
            >
              <StackedLineChartIcon
                sx={{
                  color: graphType === "line" ? "#fff" : "#000",
                  fontSize: 50,
                }}
              />
            </IconButton>
          </div>
        </div>
        <div className="stacked-graph-input-container">
          <Select
            isMulti
            options={programmeOptions}
            value={selectedProgrammes}
            onChange={setSelectedProgrammes}
            placeholder="Select Programmes"
            className="stacked-graph-select filter-select"
            classNamePrefix="select"
          />
          <Select
            isMulti
            options={moduleOptions}
            value={selectedModules}
            onChange={setSelectedModules}
            placeholder="Select Modules"
            className="stacked-graph-select filter-select"
            classNamePrefix="select"
          />
          <Select
            isMulti
            options={yearOptions}
            value={selectedYear}
            onChange={setSelectedYear}
            placeholder="Select Year"
            className="stacked-graph-select filter-select"
            classNamePrefix="select"
          />
          <Select
            isMulti
            options={semesterOptions}
            value={selectedSemester}
            onChange={setSelectedSemester}
            placeholder="Select Semester"
            className="stacked-graph-select filter-select"
            classNamePrefix="select"
          />
        </div>
      </div>
    </div>
  );
};

export default StackedSimulations;
