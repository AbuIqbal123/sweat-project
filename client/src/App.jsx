import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import ModulesPage from "./components/ModulesPage/ModulesPage";
import LandingPage from "./components/LandingPage/LandingPage";
import NavBar from "./components/NavBar/NavBar";
import InputForm from "./components/InputForm/InputForm";

function App() {
  const [userRole, setUserRole] = useState("Student");

  return (
    <Router>
      <div>
        <NavBar userRole={userRole} setUserRole={setUserRole} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/simulations"
            element={<HomePage userRole={userRole} />}
          />
          <Route path="/modules" element={<ModulesPage />} />
          <Route
            path="/input-modules"
            element={<InputForm userRole={userRole} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
