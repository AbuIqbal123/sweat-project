import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import CircularProgressBar from "../../components/ProgressBar/CircularProgressBar";
import "./Simulations.css";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  Label,
} from "recharts";
import html2canvas from "html2canvas";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DetailsModal from "../../components/DetailsModal/DetailsModal";
import moduleService from "../../services/moduleService";

const Simulations = () => {
  const [modifiedData, setModifiedData] = useState([]);
  const [moduleType, setModuleType] = useState([]);
  const [moduleData, setModuleData] = useState({});
  const [module, setModule] = useState("");
  const [hours, setHours] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState("moderate");
  const [secondTableData, setSecondTableData] = useState();
  const [newUpdatedValues, setNewUpdatedValues] = useState();
  const [counter, setCounter] = useState(0);
  const [moduleCode, setModuleCode] = useState();
  const [timetabledHours, setTimetabledHours] = useState();
  const [totalHours, setTotalHours] = useState();
  const [privateHours, setPrivateHours] = useState();
  const [credits, setCredits] = useState();
  const navigate = useNavigate();
  const { isStudent, setPdfPreviewData, setGraphSS, setFiltersData, refetch } =
    useContext(AuthContext);
  const merge = (data, type) => {
    if (!data || typeof data !== "object") {
      // Return some default structure or handle error as appropriate
      return { hours: 0, distribution: [] };
    }

    if (!Array.isArray(data)) {
      const newdata = {
        distribution: data["distribution"] || [],
      };
      newdata["hours"] =
        data["studyHours"] === undefined
          ? data["hours"] || 0
          : data["studyHours"];
      return newdata;
    } else {
      const merged = {};
      let hours = 0.0;
      for (const i of data) {
        if (!i["distribution"] || !Array.isArray(i["distribution"][type]))
          continue; // Safeguard against undefined or unexpected structure

        i["distribution"][type].forEach((item) => {
          const weekIndex = item.week - 1;
          if (merged[weekIndex]) {
            merged[weekIndex].hours += item.hours;
          } else {
            merged[weekIndex] = { week: item.week, hours: item.hours };
          }
        });
        hours += i["studyHours"] || 0; // Safeguard against undefined studyHours
      }
      return { hours: hours, distribution: Object.values(merged) };
    }
  };

  const toggleModal = async () => {
    if (module === "Select Module") {
      toast.error("Please Select Module");
    } else {
      setIsOpen(!isOpen);
    }
  };

  const captureScreenshot = async () => {
    const graphElement = document.getElementById("775533");
    const canvas = await html2canvas(graphElement);
    const dataURL = canvas.toDataURL();
    const image = new Image();
    image.src = dataURL;
    return image;
  };

  useEffect(() => {
    if (module !== "Select Module") {
      (async () => {
        setPdfPreviewData([moduleData]);
      })();
    }
  }, [moduleData]);

  async function extractInfo(key, name, data) {
    if (Array.isArray(data)) {
      const extractedArray = await Promise.all(
        data.map(async (item, index) => {
          const { deadline, weightage } = await item;
          return {
            key: key + index,
            type: name,
            deadline: "Week" + deadline,
            weightage,
          };
        })
      );
      return extractedArray;
    } else if (typeof data === "object" && data !== null) {
      const { deadline, weightage } = await data;
      return [{ key, type: name, deadline: "Week" + deadline, weightage }];
    } else {
      return [];
    }
  }

  useEffect(() => {
    (async () => {
      const result = await moduleService.getCodes();
      const moduleData = result.data.map((module) => module.moduleCode);
      moduleData.unshift("Select Module");
      setModule(moduleData[0]);
      setModuleType(moduleData);
    })();
  }, []);

  useEffect(() => {
    if (module === "Select Module") return;
    (async () => {
      const result = await moduleService.getSingleCode(module);
      setModuleCode(result?.data?.moduleCode);
      setCredits(result?.data?.moduleCredit);
      setTimetabledHours(result?.data?.timetabledHours);
      setTotalHours(result?.data?.totalStudyHours);
      setPrivateHours(result?.data?.privateStudyHours);
      setModuleData(result.data);

      // Store entire arrays
      const extractedInfoArray1 = await extractInfo(
        counter + 2,
        "Class Test",
        result.data.classtestPrep
      );
      const extractedInfoArray2 = await extractInfo(
        counter + 1,
        "Course Work",
        result.data.courseworkPrep
      );
      const extractedInfoArray3 = await extractInfo(
        counter,
        "Exam",
        result.data.examPrep
      );

      // Concatenate the arrays to get the final format
      const finalArray = extractedInfoArray3.concat(
        extractedInfoArray2,
        extractedInfoArray1
      );
      let { programme, semester, studyYear, title, optional } = result.data;
      const newVaues = { programme, semester, studyYear, title, optional };
      setNewUpdatedValues(newVaues);
      setSecondTableData(finalArray);
    })();
  }, [module, refetch]);

  useEffect(() => {
    if (type === undefined) return;
    if (type === "") {
      setModifiedData([]);
      return;
    }
    if (Object.keys(moduleData).length === 0) return;
    const result = [];
    const newdata = {};
    const listName = [
      "lectures",
      "seminars",
      "tutorials",
      "labs",
      "fieldworkPlacement",
      "other",
      "examPrep",
      "courseworkPrep",
      "classtestPrep",
    ];
    listName.forEach((item) => {
      newdata[item] = merge(moduleData[item], type);
    });
    let HoursData = {};
    Object.keys(newdata).forEach((item) => {
      return (HoursData[item] = newdata[item].hours || 0);
    });
    setHours(HoursData);
    for (let week = 1; week <= 15; week++) {
      const weekObject = { name: `Week ${week}`, week };
      for (const category in newdata) {
        if (category !== "moduleCode" && category !== "moduleCredit") {
          const categoryData = newdata[category];
          if (categoryData.distribution) {
            const hoursForWeek =
              categoryData.distribution.find((item) => item.week === week)
                ?.hours || 0;
            weekObject[category] = hoursForWeek;
          }
        }
      }

      result.push(weekObject);
    }
    setModifiedData(result);
  }, [moduleData, type]);

  const makePercentage = (value) => {
    return ((value / totalHours) * 100).toFixed();
  };

  const handlePreviewPdf = async () => {
    if (module === "Select Module") {
      toast.error("Please Select Module");
    } else {
      const image = await captureScreenshot();
      setFiltersData();
      setGraphSS({ image: image?.src, module, type });
      navigate("/preview-pdf");
    }
  };

  return (
    <div className="main-chart-container">
      {isOpen && (
        <DetailsModal
          toggleModal={toggleModal}
          hours={hours}
          secondTableData={secondTableData}
          moduleCode={moduleCode}
          credits={credits}
          newValues={newUpdatedValues}
          timetabledHours={timetabledHours}
        />
      )}
      <div className="area-chart-container">
        <h1 className="firstHeading">Workload Graph</h1>
        <div className="chart" id="775533">
          <ResponsiveContainer height={380}>
            <LineChart
              data={modifiedData}
              margin={{ top: 40, right: 35, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week">
                <Label value="Week" position="insideBottom" offset={-15} />
              </XAxis>

              <YAxis domain={[0, "dataMax"]} interval="preserveStart">
                <Label
                  value="Study Hours"
                  position="insideLeft"
                  angle={-90}
                  dy={70}
                />
              </YAxis>
              <Legend
                verticalAlign="bottom"
                wrapperStyle={{ position: "relative", top: "-20px" }}
              />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="examPrep"
                stroke="black"
                name="Exam Prep"
              />
              <Line
                type="monotone"
                dataKey="labHours"
                stroke="#FF6B6B"
                name="Lab Hours"
              />
              <Line
                type="monotone"
                dataKey="lectures"
                stroke="#66FF66"
                name="Lectures"
              />
              <Line
                type="monotone"
                dataKey="tutorials"
                stroke="#4169E1"
                name="Tutorials"
              />
              <Line
                type="monotone"
                dataKey="courseworkPrep"
                stroke="red"
                name="Coursework Prep"
              />
              <Line
                type="monotone"
                dataKey="classtestPrep"
                stroke="#800080"
                name="Class Test Prep"
              />
              <Line
                type="monotone"
                dataKey="seminars"
                stroke="#FFD700" // Gold color for seminars
                name="Seminars"
              />
              <Line
                type="monotone"
                dataKey="fieldworkPlacement"
                stroke="#20B2AA" // LightSeaGreen color for fieldworkPlacement
                name="Fieldwork Placement"
              />
              <Line
                type="monotone"
                dataKey="other"
                stroke="#FFA07A" // LightSalmon color for other activities
                name="Other"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="insights-container">
        <h1 className="secondHeading">Insights</h1>
        <div className="parent-insights">
          <div className="progress-1">
            <CircularProgressBar
              percentage={makePercentage(timetabledHours)}
              color={"#051650"}
            />
            <h2 className="h2First">Time Tabled Hours</h2>
          </div>
          <div className="progress-1">
            <CircularProgressBar
              percentage={makePercentage(privateHours)}
              color={"#b10062"}
            />
            <h2 className="h2First">Private Study Hours</h2>
          </div>
        </div>
        <div
          style={{ display: "flex", flexDirection: "column" }}
          className="inputt"
        >
          <select
            name="select_module"
            id="select_module"
            value={module}
            onChange={(e) => setModule(e.target.value)}
          >
            {moduleType.map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
          </select>

          <select
            name="study_style"
            id="study_style"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="Study Style" disabled>
              Study Style
            </option>
            <option value="earlybird">Early Bird</option>
            <option value="moderate">Moderate</option>
            <option value="procrastinator">Procrastinator</option>
          </select>
          {isStudent === "Admin" && (
            <div className="button-container">
              <div className="details-button-container">
                <button className="details-button" onClick={toggleModal}>
                  <span> Module Details</span>
                  <i></i> {/* This will become the arrow on hover */}
                </button>
              </div>

              <div className="preview-pdf-button-container">
                <button
                  className="preview-pdf-button"
                  onClick={handlePreviewPdf}
                >
                  <span>Preview PDF</span>
                  <i></i> 
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Simulations;
