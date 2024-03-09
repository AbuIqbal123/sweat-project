import React, { useState, useEffect } from "react";
import { Progress } from "antd";

// Custom hook to listen to window resize events and return width
function useWindowSize() {
  const [size, setSize] = useState([0, 0]);

  useEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize(); // Trigger at least once to set initial size
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
}

const CircularProgressBar = ({ percentage, color }) => {
  const [width, height] = useWindowSize();

  // Dynamic adjustments based on width
  const dynamicWidth = width < 480 ? 80 : width < 768 ? 90 : 100;
  const dynamicStrokeWidth = width < 480 ? 8 : width < 768 ? 10 : 12;

  return (
    <div className="circular-progress">
      <Progress
        type="circle"
        percent={percentage}
        width={dynamicWidth}
        strokeColor={color}
        strokeWidth={dynamicStrokeWidth}
        format={() => <p style={{ color: "white" }}>{`${percentage}%`}</p>}
      />
    </div>
  );
};

export default CircularProgressBar;
