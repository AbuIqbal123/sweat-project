import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import "./Home.css";

const Home = () => {
  const { isStudent } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className={"main-div"}>
      <div className="div2">
        <h1>Student Workload Impact Evolution Tool</h1>
        <p className="description">
          This tool helps predict the academic workload for students,
          streamlining curriculum planning for educators. It offers insights
          into the effects of coursework on students' time and resources.
        </p>
        <div className="btnContainer">
          {" "}
          <div className="btn1">
            <button onClick={() => navigate("/previous-courses")}>
              <span>Modules</span>
              <i></i>
            </button>
          </div>
          {isStudent === "Admin" && (
            <div className="btn2">
              <button onClick={() => navigate("/select-course")}>
                <span>Add a module</span>
                <i></i>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
