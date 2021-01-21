import React, { useEffect, useState } from "react";

const Sensor = () => {
  const [orientation, setOrientation] = useState({ alpha: 0, beta: 0, gamma: 0 });
  const [acceleration, setAcceleration] = useState({ x: 0, y: 0, z: 0 });
  const [accelerationIncludingGravity, setAccelerationIncludingGravity] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [rotationRate, setRotationRate] = useState({ alpha: 0, beta: 0, gamma: 0 });
  useEffect(() => {
    // window.addEventListener("devicemotion", (e) => {
    //   console.log(" device motion e", e);
    //   setAcceleration((prev) => Object.assign({}, prev, e.acceleration));
    //   setAccelerationIncludingGravity((prev) =>
    //     Object.assign({}, prev, e.accelerationIncludingGravity)
    //   );
    //   setRotationRate((prev) =>
    //     Object.assign({}, prev, {
    //       alpha: e.rotationRate.alpha || 0,
    //       beta: e.rotationRate.beta || 0,
    //       gamma: e.rotationRate.gamma || 0,
    //     })
    //   );
    // });
    window.addEventListener("deviceorientation", (e) => {
      setOrientation((prev) =>
        Object.assign({}, prev, { alpha: e.alpha || 0, beta: e.beta || 0, gamma: e.gamma || 0 })
      );
      console.log(" device orientation e", e);
    });
  }, []);
  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        left: 0,
        top: 0,
        padding: "20px",
        display: "flex",
        justifyContent: "flex-start",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          background: "rgba(0,0,0,0)",
          //   color: "white",
          padding: "20px",
          borderRadius: "8px",
          maxWidth: "300px",
          width: "100%",
        }}
      >
        <div style={{ marginBottom: 10 }}>
          <div className="title">Orientation</div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>X-axis (β)</div>
            <div>{orientation.beta}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>Y-axis (γ)</div>
            <div>{orientation.gamma}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>Z-axis (α)</div>
            <div>{orientation.alpha}</div>
          </div>
        </div>
        <div style={{ marginBottom: 10 }}>
          <div className="title">Accelerometer</div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>X-axis (β)</div>
            <div>{acceleration.x}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>Y-axis (γ)</div>
            <div>{acceleration.y}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>Z-axis (α)</div>
            <div>{acceleration.z}</div>
          </div>
        </div>
        <div style={{ marginBottom: 10 }}>
          <div className="title">Accelerometer including gravity</div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>X-axis (β)</div>
            <div>{accelerationIncludingGravity.x}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>Y-axis (γ)</div>
            <div>{accelerationIncludingGravity.y}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>Z-axis (α)</div>
            <div>{accelerationIncludingGravity.z}</div>
          </div>
        </div>
        <div style={{ marginBottom: 10 }}>
          <div className="title">Gyroscope</div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>X-axis (β)</div>
            <div>{rotationRate.beta}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>Y-axis (γ)</div>
            <div>{rotationRate.gamma}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>Z-axis (α)</div>
            <div>{rotationRate.alpha}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sensor;
