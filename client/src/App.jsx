import "./App.css";
import CourseSelection from "./pages/CourseSelection/CourseSelection";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import PreviousCourses from "./pages/PreviousCourses/PreviousCourses.jsx";
import Simulations from "./pages/Simulations/Simulations";
import PreviewPdf from "./pages/PreviewPdf/index.jsx";
import Insights from "./pages/Insights/Insights.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StackedSimulations from "./pages/StackedSimulations/StackedSimulations.jsx";

function App() {
  return (
    <div
      style={{
        background: "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
        height: "100vh",
      }}
    >
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/select-course"} element={<CourseSelection />} />
          <Route path={"/previous-courses"} element={<PreviousCourses />} />
          <Route path={"/simulations"} element={<Simulations />} />
          <Route path={"/preview-pdf"} element={<PreviewPdf />} />
          <Route path={"/insight/:id"} element={<Insights />} />
          <Route
            path={"/stacked-simulations"}
            element={<StackedSimulations />}
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
