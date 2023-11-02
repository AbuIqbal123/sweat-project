// import React, { useState, useEffect } from "react";
// import StudyHoursLineGraph from "./graph/LineGraph";
// import { modulesData } from "./utility/DataSchema";
// import { getTest } from "./functions/test";

// function App() {
//   const [data, setData] = useState("SWEAT Project");
//   const [selectedModule, setSelectedModule] = useState("ELEC320");

//   useEffect(() => {
//     getTest()
//       .then((res) => {
//         setData(res.message);
//       })
//       .catch((error) => console.log(error));
//   }, []);

//   const handleModuleChange = (event) => {
//     setSelectedModule(event.target.value);
//   };

//   return (
//     <>
//       <div className="App">
//         <h1>{data}</h1>
//         <select value={selectedModule} onChange={handleModuleChange}>
//           <option value="ELEC320">ELEC320</option>
//           <option value="ELEC362">ELEC362</option>
//         </select>
//       </div>
//       <div className="Line Graph">
//         <StudyHoursLineGraph moduleData={modulesData[selectedModule]} />
//       </div>
//     </>
//   );
// }

// export default App;

import React, { useState } from "react";
// Import the component
import { modulesData } from "./utility/DataSchema"; // Import your data schema

import StudyHoursLineGraph from "./graph/LineGraph";

function App() {
  const [selectedModule, setSelectedModule] = useState("ELEC320");

  const handleModuleChange = (event) => {
    setSelectedModule(event.target.value);
  };

  return (
    <>
      <div className="App">
        <h1>SWEAT Project</h1>
        <select value={selectedModule} onChange={handleModuleChange}>
          <option value="ELEC320">ELEC320</option>
          <option value="ELEC362">ELEC362</option>
        </select>
      </div>
      <div className="Line Graph">
        <StudyHoursLineGraph moduleData={modulesData[selectedModule]} />
      </div>
    </>
  );
}

export default App;
