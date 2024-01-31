import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { CustomTooltip } from "./functions";
import "./LineGraph.css";
import EditButton from "./EditButton";
import EditModuleModal from "./EditModuleModal";

const StudyHoursLineGraph = ({ moduleData, studyStyle }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  if (!moduleData) {
    return (
      <div className="study-hours-line-graph-container">
        No data found for the selected module.
      </div>
    );
  }

  // Array representing weeks
  const weeks = Array.from({ length: 16 }, (_, i) => i);
  const selectedCourseworkPrep = moduleData.courseworkPrep[studyStyle];

  // Calculate hours for different study components
  const labHours = weeks.map((week) => {
    if (moduleData && moduleData.labHours) {
      const weekData = moduleData.labHours.find((lab) => lab.week === week);
      return weekData ? weekData.hours : 0;
    }
    return 0;
  });

  const lectureHours = weeks.map((week) => {
    if (moduleData && moduleData.lectures) {
      const weekData = moduleData.lectures.find(
        (lecture) => lecture.week === week
      );
      return weekData ? weekData.hours : 0;
    }
    return 0;
  });

  const tutorialHours = weeks.map((week) => {
    if (moduleData && moduleData.tutorials) {
      const weekData = moduleData.tutorials.find(
        (tutorial) => tutorial.week === week
      );
      return weekData ? weekData.hours : 0;
    }
    return 0;
  });

  const seminarHours = weeks.map((week) => {
    if (moduleData && moduleData.seminars) {
      const weekData = moduleData.seminars.find(
        (seminar) => seminar.week === week
      );
      return weekData ? weekData.hours : 0;
    }
    return 0;
  });

  const fieldworkHours = weeks.map((week) => {
    if (moduleData && moduleData.fieldworkPlacement) {
      const weekData = moduleData.fieldworkPlacement.find(
        (fieldwork) => fieldwork.week === week
      );
      return weekData ? weekData.hours : 0;
    }
    return 0;
  });

  const otherHours = weeks.map((week) => {
    if (moduleData && moduleData.other) {
      const weekData = moduleData.other.find((other) => other.week === week);
      return weekData ? weekData.hours : 0;
    }
    return 0;
  });

  const courseworkPrepHours = weeks.map((week) => {
    if (selectedCourseworkPrep) {
      const weekData = selectedCourseworkPrep.find(
        (data) => data.week === week
      );
      return weekData ? weekData.hours : 0;
    }
    return 0;
  });

  const sum = (arr) => arr.reduce((acc, val) => acc + val, 0);

  const examPrepHours = weeks.map((week) =>
    moduleData.examPrep.weeks.includes(week)
      ? (moduleData.examPrep.weightage * moduleData.privateStudyHours) / 100 / 3
      : 0
  );

  // Calculate total study hours for each week
  const totalStudyHours = weeks.map((week) => {
    return (
      labHours[week] +
      lectureHours[week] +
      tutorialHours[week] +
      examPrepHours[week] +
      courseworkPrepHours[week]
    );
  });

  // Prepare final data for the line chart
  const data = weeks.map((week) => {
    const selectedCourseworkPrep = moduleData.courseworkPrep[studyStyle];

    const dataObj = {
      week,
      Labs: labHours[week],
      Lectures: lectureHours[week],
      Tutorials: tutorialHours[week],
      "Exam Prep": examPrepHours[week],
      "Coursework Prep": courseworkPrepHours[week],
      "Total Study Hours": totalStudyHours[week], // Include total study hours
      Seminars: seminarHours[week], // Include Seminars
      Fieldwork: fieldworkHours[week], // Include Fieldwork
      Other: otherHours[week], // Include Other
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

          {/* New lines for study components */}
          {sum(seminarHours) !== 0 && (
            <Line type="monotone" dataKey="Seminars" stroke="#ff00ff" />
          )}
          {sum(fieldworkHours) !== 0 && (
            <Line type="monotone" dataKey="Fieldwork" stroke="#00ff00" />
          )}
          {sum(otherHours) !== 0 && (
            <Line type="monotone" dataKey="Other" stroke="#ff0000" />
          )}
        </LineChart>
      </div>
      <div className="line-graph-container">
        <EditButton onClick={() => setIsModalOpen(true)} />
        <EditModuleModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default StudyHoursLineGraph;
