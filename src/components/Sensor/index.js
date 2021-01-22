import React from "react";
import RealTimeChart from "./Chart";

const Sensor = ({ value, subject, units, range, sendSensorData }) => {
  const { x, y, z } = value;
  return (
    <div
      style={{
        boxSizing: "border-box",
        background: "white",
        padding: "20px",
        borderRadius: "8px",
        width: "100%",
      }}
    >
      <div style={{ display: "flex" }}>
        <div className="title" style={{ marginBottom: "10px", flexGrow: 1 }}>
          {subject}
        </div>
        <div style={{ width: 130 }}></div>
      </div>

      <div style={{ display: "flex" }}>
        <div style={{ width: "50px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ marginRight: 4 }}>x:</div>
            <div>
              {x.toFixed(1)}
              {units}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ marginRight: 4 }}>y:</div>
            <div>
              {y.toFixed(1)}
              {units}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ marginRight: 4 }}>z:</div>
            <div>
              {z.toFixed(1)}
              {units}
            </div>
          </div>
        </div>
        <div style={{ flexGrow: 1, width: 0 }}>
          <RealTimeChart
            sendSensorData={sendSensorData}
            value={value}
            range={range}
            subject={subject}
          ></RealTimeChart>
        </div>
      </div>
    </div>
  );
};

export default Sensor;
