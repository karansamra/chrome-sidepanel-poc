import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import GVLogo from "/icons/icon128.png";
import "./App.css";

function App() {
  const [callQueue, setCallQueue] = useState([
    {
      id: 1,
      client: "Pet Emergency Clinic",
      time: "2 min ago",
      priority: "high",
    },
    {
      id: 2,
      client: "Downtown Vet Hospital",
      time: "5 min ago",
      priority: "medium",
    },
    { id: 3, client: "Animal Care Center", time: "8 min ago", priority: "low" },
  ]);

  useEffect(() => {
    const port = chrome.runtime.connect({ name: "sidePanel" });

    port.onDisconnect.addListener(() => {
      console.log("Panel disconnected — tab/side panel likely closed");
      chrome.runtime.sendMessage({ type: "SIDE_PANEL_CLOSED" });
    });

    return () => port.disconnect();
  }, []);

  return (
    <>
      <div>
        <img src={GVLogo} className="gv-logo" alt="GV logo" />
      </div>
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div> */}
      <h1>Guardian Vets Calls Queue Extension PoC</h1>
      <p className="powered-by">powered by Vite + React</p>

      <div className="call-queue">
        <h2>Current Call Queue</h2>
        <div className="queue-stats">
          <span className="stat">📞 {callQueue.length} calls waiting</span>
          <span className="stat">⏱️ Avg wait: 5 min</span>
        </div>

        <div className="call-list">
          {callQueue.map((call) => (
            <div
              key={call.id}
              className={`call-item priority-${call.priority}`}
            >
              <div className="call-info">
                <div className="client-name">{call.client}</div>
                <div className="call-time">{call.time}</div>
              </div>
              <div className="call-actions">
                <button className="answer-call-btn">Answer</button>
                <span className={`priority-badge ${call.priority}`}>
                  {call.priority.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
