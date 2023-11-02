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

const distributeStudyHours = (studyHours, deadline) => {
  const maxHoursPerWeek = 20;

  if (studyHours <= maxHoursPerWeek) {
    const distribution = Array(16).fill(0);
    distribution[deadline] = studyHours;
    return distribution;
  }

  const numWeeks = Math.ceil(studyHours / maxHoursPerWeek);
  const startWeek = deadline - numWeeks + 1;
  const hoursPerWeek = Math.floor(studyHours / numWeeks);

  const distribution = Array(16).fill(0);

  for (let i = 0; i < numWeeks; i++) {
    distribution[startWeek + i] = hoursPerWeek;
  }

  if (studyHours % maxHoursPerWeek !== 0) {
    const remainingHours = studyHours % maxHoursPerWeek;
    for (let i = 0; i < remainingHours; i++) {
      distribution[startWeek + i] += 1;
    }
  }

  return distribution;
};

const StudyHoursLineGraph = ({ moduleData }) => {
  if (!moduleData) {
    return <div>No data found for the selected module.</div>;
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
          coursework.deadline
        );
      }

      return coursework.distribution[week];
    } else {
      return 0; // Handle weeks with no coursework data
    }
  });

  const totalStudyHours = weeks.map(
    (week) =>
      labHours[week] +
      lectureHours[week] +
      tutorialHours[week] +
      examPrepHours[week] +
      courseworkPrepHours[week]
  );

  const data = weeks.map((week) => ({
    week: week.toString(),
    Labs: labHours[week],
    Lectures: lectureHours[week],
    Tutorials: tutorialHours[week],
    "Exam Prep": examPrepHours[week],
    "Coursework Prep": courseworkPrepHours[week], // Fixed the legend key
    "Total Study Hours": totalStudyHours[week],
  }));

  return (
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
      <Tooltip />
      <Legend />
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
      <Line type="monotone" dataKey="Total Study Hours" stroke="#8884d8" />
    </LineChart>
  );
};

export default StudyHoursLineGraph;
