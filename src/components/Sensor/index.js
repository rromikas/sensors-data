import React from "react";
import RealTimeChart from "./Chart";

const Sensor = ({ value, subject, units }) => {
  const { x, y, z } = value;
  console.log("x,yz", z, y, z, subject);
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
      <div className="title" style={{ marginBottom: "10px" }}>
        {subject}
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ width: "50px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div>x:</div>
            <div>
              {x.toFixed(1)}
              {units}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div>y:</div>
            <div>
              {y.toFixed(1)}
              {units}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div>z:</div>
            <div>
              {z.toFixed(1)}
              {units}
            </div>
          </div>
        </div>
        <div style={{ flexGrow: 1, width: 0 }}>
          <RealTimeChart value={value}></RealTimeChart>
        </div>
      </div>
    </div>
  );
};

export default Sensor;
