export const distributeStudyHours = (studyHours, deadline, style) => {
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

export const CustomTooltip = ({ active, payload, label, totalStudyHours }) => {
  if (active && payload && payload.length) {
    const dataKeys = payload.map((data) => data.dataKey);
    const colors = {
      Labs: "#8884d8",
      Lectures: "#82ca9d",
      Tutorials: "#ffc658",
      "Exam Prep": "#000",
      "Coursework Prep": "#ff7300",
      Seminars: "#ff00ff", // Color for Seminars
      Fieldwork: "#00ff00", // Color for Fieldwork
      Other: "#ff0000", // Color for Other
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
