import { useState } from "react";
import "./App.css";
import { Card, Col, Progress, Row } from "reactstrap";
import axios from "axios";

function App() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [websocketData, setWebsocketData] = useState("");
  const [lang, setLang] = useState("");
  const files = [
    // {
    //   fileName: "A.mp3",
    //   fileID: 11011001,
    // },

    // 101, 102, 103, 104, 105, 106, 107, 108
    {
      fileName: "Speech Transformer _ Automatic Speech Recognition (ASR).mp4",
      fileID: 11011001,
    },
    {
      fileName: "Playboi_Carti_-_Place-Sweethiphop.com.mp3",
      fileID: 102,
    },
    {
      fileName: "C.mp3",
      fileID: 103,
    },
    {
      fileName: "D.mp3",
      fileID: 104,
    },
    {
      fileName: "E.mp3",
      fileID: 105,
    },
    {
      fileName: "F.mp3",
      fileID: 106,
    },
    {
      fileName: "G.mp3",
      fileID: 107,
    },
    {
      fileName: "H.mp3",
      fileID: 108,
    },
    {
      fileName: "A.mp4",
      fileID: 201,
    },
    {
      fileName: "B.mp4",
      fileID: 202,
    },
    {
      fileName: "C.mp4",
      fileID: 203,
    },
    {
      fileName: "D.mp4",
      fileID: 204,
    },
  ];
  const handleChange = (e) => {
    setLang(e.target.value);
  };

  const handleSubmit = (id) => {
    setLoading(true);
    axios
      .get(`http://localhost:8000/transcription/${id}`)
      .then((response) => {
        setResponse(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSocket = (lang) => {
    const socket = new WebSocket(`ws://localhost:8081/${lang}`);
    socket.addEventListener("open", (event) => {
      console.log("WebSocket connection opened:", event);

      socket && console.log(socket + "fasdfasfsda");
    });
    socket.addEventListener("message", (event) => {
      console.log("WebSocket message received:", event.data);
      setWebsocketData(event.data + "dsdsds");
    });
  };
  return (
    <div className="whole">
      <Row style={{ height: "100vh" }} className="m-0">
        <Col md={6} style={{ borderRight: "", borderColor: "#de0e3" }}>
          <Row className="m-0">
            <h3 className="mb-3 mt-3 text-white">
              Choose file for transcription
            </h3>
            {files.map((item, index) => (
              <Col md={3}>
                <Card
                  key={item.id}
                  onClick={() => handleSubmit(item.fileID)}
                  className="p-3 menu d-flex mb-2 align-items-center justify-content-center"
                >
                  {item.fileName}
                </Card>
              </Col>
            ))}
            {/* <Col md={3}>
              <Card className="p-3 menu d-flex mb-2 align-items-center justify-content-center">
                Ecstasy.mp3
              </Card>
            </Col>
            <Col md={3}>
              <Card className="p-3 menu d-flex mb-2 align-items-center justify-content-center">
                Worst.mp3
              </Card>
            </Col>
            <Col md={3}>
              <Card className="p-3 menu d-flex mb-2 align-items-center justify-content-center">
                Amari.mp3
              </Card>
            </Col> */}
            <div className="mt-3">
              <Progress
                animated
                className="my-3"
                style={{ backgroundColor: "#353535" }}
                value={50}
              >
                Extracting Audio
              </Progress>
              {/* {loading && (
                <Progress
                  animated
                  className="my-3"
                  style={{ backgroundColor: "#353535" }}
                  color="success"
                  value={progressValue}
                >
                  {progressValue}% Complete
                </Progress>
              )} */}
            </div>

            <h6 className="mt-4 text-success">Transcription Completed</h6>
            {/* <h6 className="">
              Use this session ID to get transcription: <b>21212</b>
            </h6> */}
          </Row>
        </Col>

        <Col md={6} className="p-4">
          <div className="result_div p-4">
            <h5 className="text-white">Transcription</h5>

            {/* <div>
                <label htmlFor="sessionID">Session ID</label>
                <input
                  type="text"
                  id="sessionID"
                  className="input"
                  placeholder="000000"
                />
              </div> */}
            <div className="mt-3">
              <label htmlFor="language" className="text-white">
                Choose Language
                {JSON.stringify(lang)}
              </label>
              <select
                value={lang}
                onChange={handleChange}
                name=""
                id="language"
                className="input"
              >
                <option>--</option>
                <option value={"en"}>English</option>
                <option value={"fr"}>French</option>
                <option value={"sw"}>Swahili</option>
                <option value={"es"}>Spanish</option>
                <option value={"yr"}>Yoruba</option>
                <option value={"ha"}>Hausa</option>
              </select>
            </div>
            <div className="mt-3">
              <button className="sub" onClick={() => handleSocket(lang)}>
                Submit
              </button>
            </div>
            {websocketData ? (
              <>
                <h5 className="mt-3 text-white">Result</h5>
                <p className="text-white">{websocketData}</p>
              </>
            ) : (
              ""
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default App;
