import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import "./LineGraph.css";

const StudyHoursLineGraph = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Make a GET request to your Express.js API endpoint
    axios.get("/api/modules").then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <div className="study-hours-line-graph-container">
      <div className="graph-title">Study Hours Line Graph</div>
      <div className="chart-container">
        {/* Render your LineChart component with the data you received from the API */}
        <LineChart
          width={600}
          height={300}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="week"
            domain={[0, 15]}
            allowDataOverflow={true}
            label={{ value: "Week", position: "insideBottom", offset: -10 }}
          />
          <YAxis
            label={{ value: "Study Hours", angle: -90, position: "insideLeft" }}
          />
          <Tooltip
            labelFormatter={(value) => `Week ${value}`} // Add "Week" prefix to tooltip label
            formatter={(value) => `${value} hours`} // Add " hours" suffix to the value
          />
          <Legend wrapperStyle={{ marginTop: "30px" }} />
          <Line
            type="monotone"
            dataKey="Labs"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="Lectures" stroke="#82ca9d" />
          <Line type="monotone" dataKey="Tutorials" stroke="#ffc658" />
          <Line type="monotone" dataKey="Exam Prep" stroke="#000" />
          <Line type="monotone" dataKey="Coursework Prep" stroke="#ff7300" />
        </LineChart>
      </div>
    </div>
  );
};

export default StudyHoursLineGraph;
