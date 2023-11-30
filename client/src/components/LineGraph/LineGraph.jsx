import React from "react";
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

// Function to distribute study hours based on different styles
const distributeStudyHours = (studyHours, deadline, style) => {
  // Maximum study hours per week
  const maxHoursPerWeek = 20;

  // If study hours fit within one week, distribute them accordingly
  if (studyHours <= maxHoursPerWeek) {
    const distribution = Array(16).fill(0);
    distribution[deadline] = studyHours;
    return distribution;
  }

  // If study hours exceed one week, distribute them based on the selected style
  const numWeeks = Math.ceil(studyHours / maxHoursPerWeek);
  const startWeek = deadline - numWeeks + 1;
  const distribution = Array(16).fill(0);

  if (style === "balanced") {
    // Distribute hours evenly across weeks
    const hoursPerWeek = Math.floor(studyHours / numWeeks);
    const remainingHours = studyHours % numWeeks;

    for (let i = 0; i < numWeeks; i++) {
      distribution[startWeek + i] = hoursPerWeek;
      if (i < remainingHours) {
        distribution[startWeek + i] += 1;
      }
    }
  } else if (style === "procrastinator") {
    // Distribute hours in a procrastinator style
    let distributedHours = 0;
    for (let i = startWeek + numWeeks - 1; i >= startWeek; i--) {
      const additionalHours = Math.min(
        maxHoursPerWeek,
        studyHours - distributedHours
      );
      distribution[i] += additionalHours;
      distributedHours += additionalHours;
    }
  } else if (style === "earlybird") {
    // Distribute hours in an early bird style
    let distributedHours = 0;
    for (let i = startWeek; i < startWeek + numWeeks; i++) {
      const additionalHours = Math.min(
        maxHoursPerWeek,
        studyHours - distributedHours
      );
      distribution[i] += additionalHours;
      distributedHours += additionalHours;
    }
  }
  return distribution;
};

const CustomTooltip = ({ active, payload, label, totalStudyHours }) => {
  if (active && payload && payload.length) {
    const dataKeys = payload.map((data) => data.dataKey);
    const colors = {
      Labs: "#8884d8",
      Lectures: "#82ca9d",
      Tutorials: "#ffc658",
      "Exam Prep": "#000",
      "Coursework Prep": "#ff7300",
    };

    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "white",
          padding: "15px",
          border: "1px solid #ccc",
          fontSize: "14px",
        }}
      >
        <p
          className="label"
          style={{ marginBottom: "8px", fontSize: "16px" }}
        >{`Week ${label}`}</p>
        {payload.map((data) => (
          <p
            key={data.dataKey}
            className="data-item"
            style={{
              color: colors[data.dataKey],
              margin: "8px 0",
              fontSize: "14px",
            }}
          >
            {`${data.dataKey}: ${data.value} hours`}
          </p>
        ))}
        <p
          className="total-study-hours"
          style={{
            marginTop: "12px",
            borderTop: "1px solid #ccc",
            paddingTop: "8px",
            fontSize: "14px",
          }}
        >{`Total Study Hours: ${totalStudyHours[label]} hours`}</p>
      </div>
    );
  }

  return null;
};

const StudyHoursLineGraph = ({ moduleData, studyStyle }) => {
  // Return placeholder if no data is available
  if (!moduleData) {
    return (
      <div className="study-hours-line-graph-container">
        No data found for the selected module.
      </div>
    );
  }

  // Array representing weeks
  const weeks = Array.from({ length: 16 }, (_, i) => i);

  // Calculate hours for different study components
  const labHours = weeks.map((week) =>
    moduleData.labHours.some((lab) => lab.week === week) ? 2 : 0
  );

  const lectureHours = weeks.map((week) =>
    moduleData.lectures.some((lecture) => lecture.week === week) ? 2 : 0
  );

  const tutorialHours = weeks.map((week) =>
    moduleData.tutorials.some((tutorial) => tutorial.week === week) ? 1 : 0
  );

  const examPrepHours = weeks.map((week) =>
    moduleData.examPrep.weeks.includes(week)
      ? (moduleData.examPrep.weightage * moduleData.privateStudyHours) / 100 / 3
      : 0
  );

  // Calculate coursework preparation hours distribution
  const courseworkPrepHours = weeks.map((week) => {
    const coursework = moduleData.courseworkPrep.find(
      (coursework) => coursework.deadline === week
    );

    if (coursework && coursework.distribution.length === 0) {
      coursework.distribution = distributeStudyHours(
        coursework.studyHours,
        coursework.deadline,
        studyStyle
      );
      return coursework.distribution;
    }

    // Return array filled with zeros if no coursework or distribution available
    return coursework ? coursework.distribution : Array(16).fill(0);
  });

  // Merge coursework prep distributions into a single distribution
  const mergedCourseworkPrepDistribution = courseworkPrepHours.reduce(
    (acc, distribution) => {
      for (let i = 0; i < distribution.length; i++) {
        acc[i] = (acc[i] || 0) + distribution[i];
      }
      return acc;
    },
    Array(16).fill(0)
  );

  // Prepare data for coursework prep for line chart
  const courseworkPrepData = mergedCourseworkPrepDistribution.map(
    (hours, index) => {
      return {
        week: index,
        "Coursework Prep": hours,
      };
    }
  );

  // Calculate total study hours for each week
  const totalStudyHours = weeks.map(
    (week) =>
      labHours[week] +
      lectureHours[week] +
      tutorialHours[week] +
      examPrepHours[week] +
      courseworkPrepHours.reduce(
        (acc, distribution) => acc + (distribution[week] || 0),
        0
      )
  );

  // Prepare final data for the line chart
  const data = weeks.map((week) => {
    const courseworkData = courseworkPrepData.find(
      (data) => data.week === week
    );

    const dataObj = {
      week,
      Labs: labHours[week],
      Lectures: lectureHours[week],
      Tutorials: tutorialHours[week],
      "Exam Prep": examPrepHours[week],
      "Coursework Prep": courseworkData ? courseworkData["Coursework Prep"] : 0,
      "Total Study Hours": totalStudyHours[week], // Include total study hours
    };

    return dataObj;
  });

  // Return the study hours line graph
  return (
    <div className="study-hours-line-graph-container">
      <div className="graph-title">Study Hours Line Graph</div>
      <div className="chart-container">
        <LineChart
          width={600}
          height={300}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          {/* Chart components */}
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
            content={<CustomTooltip totalStudyHours={totalStudyHours} />}
          />
          <Legend wrapperStyle={{ marginTop: "30px" }} />
          {/* Lines for different study components */}
          <Line
            type="monotone"
            dataKey="Labs"
            stroke="#8884d8"
            activeDot={{ r: 10 }}
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
