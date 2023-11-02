import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const StudyHoursGraph = () => {
  const weeks = Array.from({ length: 16 }, (_, i) => i);

  const lectureHours = Array(16).fill(0); // Initialize an array of 16 zeros
  lectureHours.fill(1, 1, 13); // Set 1 hour each week from week 1 to 12

  const tutorialHours = weeks.map((week) =>
    week % 2 === 0 && week > 0 && week <= 13 ? 1 : 0
  ); // 1 hour every alternative week starting from week 1 and ending at week 13
  // 1 hour every alternative week starting from week 1
  const examPrepHours = weeks.map((week) =>
    week >= 12 && week <= 15 ? 19 : 0
  ); // 19 hours per week for weeks 12-15

  const data = weeks.map((week) => ({
    week: week.toString(),
    Lecture: lectureHours[week],
    Tutorial: tutorialHours[week],
    'Exam Prep': examPrepHours[week],
    'Total Study Hours': lectureHours[week] + tutorialHours[week] + examPrepHours[week],
  }));

  return (
    <BarChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="week" domain={[0, 15]} allowDataOverflow={true} />
      <YAxis label={{ value: 'Study Hours', angle: -90, position: 'insideLeft' }} />
      <Tooltip content={<CustomTooltip />} />
      <Legend />
      <Bar dataKey="Lecture" fill="#8884d8" barSize={20} />
      <Bar dataKey="Tutorial" fill="#82ca9d" barSize={20} />
      <Bar dataKey="Exam Prep" fill="#ffc658" barSize={20} />
    </BarChart>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div style={{ background: '#fff', border: '1px solid #ccc', padding: '5px' }}>
        <p>{`Week: ${data.week}`}</p>
        <p style={{ color: '#8884d8' }}>{`Lecture: ${data.Lecture} hours`}</p>
        <p style={{ color: '#82ca9d' }}>{`Tutorial: ${data.Tutorial} hours`}</p>
        <p style={{ color: '#ffc658' }}>{`Exam Prep: ${data['Exam Prep']} hours`}</p>
        <p style={{ color: '#000' }}>{`Total Study Hours: ${data['Total Study Hours']} hours`}</p>
      </div>
    );
  }
  return null;
};

export default StudyHoursGraph;
