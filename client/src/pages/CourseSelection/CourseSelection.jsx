import "./CourseSelection.css";
import MyTable from "../../components/EditableTable/Table.jsx";
import MyTable2 from "../../components/EditableTable/Table2.jsx";
import { useState } from "react";
import moduleService from "../../services/moduleService.js";
import { Button, Input } from "antd";
import { toast } from 'react-toastify'
const CourseSelection = () => {
  const creditOptions = [
    {
      title: "7.5",
      value: "7.5",
    },
    {
      title: "15",
      value: "15",
    },
  ];

  const studyYear = [{ title: 1, value: 1 }, { title: 2, value: 2 }, { title: 3, value: 3 }]
  const semester = [{ title: 'First', value: 'first' }, { title: 'Second', value: 'second' }, { title: 'Whole Session', value: 'whole session' }]

  const [timetabledHours, setTimeTabledHours] = useState(null);
  const [credits, setCredits] = useState(7.5);
  const [code, setCode] = useState(null);
  const [teachingData, setTeachingData] = useState();
  const [title, setTitle] = useState();
  const [studyyear, setStudyyear] = useState(1);
  const [semesterDetail, setSemesterDetail] = useState('first');
  const [optional, setOptional] = useState(false);
  const [programmes, setProgrammes] = useState([]);
  const [assessmentsData, setAssessmentsData] = useState();
  const [error, setError] = useState(false);
  const [errorTwo, setErrorTwo] = useState(false);
  const makePayloadObject = (inputData) => {
    try {
      return {
        moduleCode: inputData.code,
        moduleCredit: inputData.credits,
        timetabledHours: parseInt(inputData.timetabledHours, 10),
        semester: semesterDetail,
        title: title,
        programme: programmes,
        studyYear: studyyear,
        optional: optional,
        lectures: parseInt(inputData.teachingsData.lectures, 10),
        seminars: parseInt(inputData.teachingsData.seminars, 10),
        tutorials: parseInt(inputData.teachingsData.tutorials, 10),
        labs: parseInt(inputData.teachingsData.labs, 10),
        fieldworkPlacement: parseInt(
          inputData.teachingsData.fieldwork_placement,
          10
        ),
        other: parseInt(inputData.teachingsData.other, 10),
        examPrep: {
          weightage: inputData.assessmentsData.examPrep.weightage,
          deadline: inputData.assessmentsData.examPrep.deadline,
        },
        courseworkPrep: inputData.assessmentsData.courseworkPrep.map(
          (item) => ({
            weightage: item.weightage,
            deadline: item.deadline,
          })
        ),
        classtestPrep: inputData.assessmentsData.classtestPrep.map((item) => ({
          weightage: item.weightage,
          deadline: item.deadline,
        })),
      };
    } catch (e) {
      console.log(e);
    }
  };

  const createCourse = async (data) => {
    try {
      const response = await moduleService.createCodes(data)
      if (response) {
        toast.success(response?.data)
        setTimeout(() => {
          window.location.reload();
        }, 2500)
      }
    } catch (e) {
      toast.error(e)
    }
  };

  const saveData = () => {
    if (!teachingData) {
      toast.error('Please save the schedule fields!')
      setError(true);
      return;
    }
    if (!assessmentsData) {
      toast.error('Please save the assessments data!')
      setErrorTwo(true);
      return;
    }
    const data = {
      teachingsData: teachingData,
      assessmentsData: assessmentsData,
      timetabledHours: timetabledHours,
      credits: credits,
      code: code,
    };

    createCourse(makePayloadObject(data));
  };

  const handleSelectProgramme = (e) => {
    if (e.target.checked) {
      setProgrammes([...programmes, e.target.name]);
    } else {
      setProgrammes(programmes?.filter(programme => programme !== e.target.name));
    }
  };

  return (
    <div className="rootContainer">
      <div className="rootc">
        <div className="rootn">
          <div className="heading">
            <h1>Input Module Details</h1>
          </div>
          <div className="inputContainer">
            <div>
              <div className="texti">Module Code</div>
              <div className="mutipleInput">
                <Input
                  onChange={(e) => setCode(e.target.value)}
                  placeholder={"Enter Module Code"}
                  status={code ? "" : "error"}
                />
              </div>
            </div>

            <div>
              <div className="texti">Module Credit</div>
              <div id="Credit" className="inputSize">
                <select
                  name="credit"
                  className="select_field"
                  id="credit"
                  onChange={(e) => setCredits(e.target.value)}
                >
                  {creditOptions?.map((option, index) => (
                    <option
                      value={option?.value}
                      defaultValue={creditOptions[0]?.value}
                      key={index}
                    >
                      {option.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <div className="texti">TimeTabled Hours</div>
              <div id="timetable" className="mutipleInput">
                <Input
                  onChange={(e) => setTimeTabledHours(e.target.value)}
                  placeholder={"Enter Timetabled Hours"}
                  status={timetabledHours ? "" : "error"}
                />
              </div>
            </div>

            <div>
              <div className="texti">Title</div>
              <div className="mutipleInput">
                <Input
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={"Enter Module Code"}
                  status={title ? "" : "error"}
                />
              </div>
            </div>
          </div>
          <div className="inputContainer">
            <div>
              <div className="texti">Study Year</div>
              <div id="Credit" className="inputSize">
                <select
                  name="credit"
                  className="select_field"
                  id="credit"
                  onChange={(e) => setStudyyear(e.target.value)}
                >
                  {studyYear?.map((option, index) => (
                    <option
                      value={option?.value}
                      defaultValue={creditOptions[0]?.value}
                      key={index}
                    >
                      {option.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <div className="texti">Programme</div>
              <div id="Programme" className="programme_checkboxes">
                <div>
                  <label>
                    <input
                      name='CSEE'
                      type="checkbox"
                      onChange={handleSelectProgramme}
                    />
                    CSEE
                  </label>
                  <label>
                    <input
                      name='AVS'
                      type="checkbox"
                      onChange={handleSelectProgramme}
                    />
                    AVS
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      name='MCR'
                      type="checkbox"
                      onChange={handleSelectProgramme}
                    />
                    MCR
                  </label>
                  <label>
                    <input
                      name='EEE'
                      type="checkbox"
                      onChange={handleSelectProgramme}
                    />
                    EEE
                  </label>
                </div>
              </div>
            </div>

            <div>
              <div className="texti">Semester</div>
              <div id="Semester" className="inputSize">
                <select
                  name="Semester"
                  id="semester"
                  className="select_field"
                  onChange={(e) => setSemesterDetail(e.target.value)}
                >
                  {semester?.map((option, index) => (
                    <option
                      value={option?.value}
                      defaultValue={creditOptions[0]?.value}
                      key={index}
                    >
                      {option.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <div className="texti">Optional</div>
              <div id="Credit" className="inputSize">
                <select
                  className="select_field"
                  name="credit"
                  id="credit"
                  onChange={(e) => setOptional(e.target.value)}
                >
                  {[{ title: 'False', value: false }, { title: 'True', value: true }]?.map((option, index) => (
                    <option
                      value={option?.value}
                      defaultValue={creditOptions[0]?.value}
                      key={index}
                    >
                      {option.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "90%",
            paddingLeft: "5%",
          }}
          className={"textui"}
        >
          <h1>Teaching Schedule</h1>
          <MyTable
            credits={credits}
            hours={timetabledHours}
            code={code}
            setTeachingData={setTeachingData}
            error={error}
            setError={setError}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "90%",
            paddingLeft: "5%",
          }}
          className={"textui"}
        >
          <h1>Assessments Schedule</h1>
          <MyTable2
            credits={credits}
            hours={timetabledHours}
            code={code}
            setAssessmentsData={setAssessmentsData}
            error={errorTwo}
            setError={setErrorTwo}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            onClick={saveData}
            style={{
              color: "#051650",
              backgroundColor: "white",
              fontWeight: "bold",
              border: "2px solid #b10062",
            }}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseSelection;
