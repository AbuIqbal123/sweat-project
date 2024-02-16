import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar"; // Adjust the path as necessary
import HomePage from "./components/HomePage/HomePage"; // Adjust the path as necessary
import ModulesPage from "./components/ModulesPage/ModulesPage"; // Adjust the path as necessary

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/modules" element={<ModulesPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
