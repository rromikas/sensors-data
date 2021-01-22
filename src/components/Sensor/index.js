import React from "react";
import RealTimeChart from "./Chart";

const Sensor = ({ value, subject, units, range, sendSensorData, id }) => {
  const { x, y, z } = value;
  const markStyle = (color) => {
    return { width: 20, height: 7, borderRadius: 5, background: color, marginRight: 5 };
  };
  const badgeContainerStyle = {
    display: "flex",
    alignItems: "center",
    maxWidth: "100px",
    width: "100%",
  };
  const valueDiv = { flexGrow: 1, display: "flex", justifyContent: "flex-end" };
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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="title" style={{ marginBottom: "10px", paddingRight: 10, flexGrow: 1 }}>
          {subject}
        </div>
        <div style={{ maxWidth: "100px", width: "100%" }}>
          <div style={badgeContainerStyle}>
            <div style={markStyle("deeppink")}></div>
            <div style={{ marginRight: 4 }}>x:</div>
            <div style={valueDiv}>
              {x.toFixed(1)}
              {units}
            </div>
          </div>
          <div style={badgeContainerStyle}>
            <div style={markStyle("deepskyblue")}></div>
            <div style={{ marginRight: 4 }}>y:</div>
            <div style={valueDiv}>
              {y.toFixed(1)}
              {units}
            </div>
          </div>
          <div style={badgeContainerStyle}>
            <div style={markStyle("rebeccapurple")}></div>
            <div style={{ marginRight: 4 }}>z:</div>
            <div style={valueDiv}>
              {z.toFixed(1)}
              {units}
            </div>
          </div>
        </div>
      </div>

      <RealTimeChart
        id={id}
        sendSensorData={sendSensorData}
        value={value}
        range={range}
        subject={subject}
      ></RealTimeChart>
    </div>
  );
};

export default Sensor;
