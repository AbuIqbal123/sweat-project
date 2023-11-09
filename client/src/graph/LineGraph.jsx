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

const distributeStudyHours = (studyHours, deadline, style) => {
  const maxHoursPerWeek = 20;

  if (studyHours <= maxHoursPerWeek) {
    const distribution = Array(16).fill(0);
    distribution[deadline] = studyHours;
    console.log(`Week ${deadline} Updated Distribution:`, [...distribution]);
    return distribution;
  }

  const numWeeks = Math.ceil(studyHours / maxHoursPerWeek);
  const startWeek = deadline - numWeeks + 1;

  const distribution = Array(16).fill(0);

  if (style === "balanced") {
    const hoursPerWeek = Math.floor(studyHours / numWeeks);
    const remainingHours = studyHours % numWeeks;

    for (let i = 0; i < numWeeks; i++) {
      distribution[startWeek + i] = hoursPerWeek;
      if (i < remainingHours) {
        distribution[startWeek + i] += 1;
      }
    }
  } else if (style === "procrastinator") {
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

  console.log(`Week ${deadline} Updated Distribution:`, [...distribution]);

  return distribution;
};

const StudyHoursLineGraph = ({ moduleData, studyStyle }) => {
  if (!moduleData) {
    return (
      <div className="study-hours-line-graph-container">
        No data found for the selected module.
      </div>
    );
  }

  const weeks = Array.from({ length: 16 }, (_, i) => i);

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

  const courseworkPrepHours = weeks.map((week) => {
    const coursework = moduleData.courseworkPrep.find(
      (coursework) => coursework.deadline === week
    );

    if (coursework) {
      if (coursework.distribution.length === 0) {
        coursework.distribution = distributeStudyHours(
          coursework.studyHours,
          coursework.deadline,
          studyStyle
        );
        console.log(`Week ${week} Distribution:`, coursework.distribution);
      }

      const result = coursework.distribution[week] || 0; // Ensure the value is 0 if undefined
      console.log(`Week ${week} Result:`, result);
      return result;
    } else {
      return 0;
    }
  });

  const totalStudyHours = weeks.map(
    (week) =>
      labHours[week] +
      lectureHours[week] +
      tutorialHours[week] +
      examPrepHours[week] +
      (courseworkPrepHours[week] || 0)
  );

  const data = weeks.map((week) => ({
    week: week,
    Labs: labHours[week],
    Lectures: lectureHours[week],
    Tutorials: tutorialHours[week],
    "Exam Prep": examPrepHours[week],
    "Coursework Prep": courseworkPrepHours[week],
    "Total Study Hours": totalStudyHours[week],
  }));

  console.log("Data:", JSON.stringify(data, null, 2)); // Log the string representation of data

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
            labelFormatter={(value) => `Week ${value}`}
            formatter={(value) => `${value} hours`}
          />
          ;
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
