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
