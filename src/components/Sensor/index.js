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
    const onDeviceMotion = (e) => {
      setAcceleration((prev) =>
        Object.assign({}, prev, { x: e.acceleration.x, y: e.acceleration.y, z: e.acceleration.z })
      );
      setAccelerationIncludingGravity((prev) =>
        Object.assign({}, prev, {
          x: e.accelerationIncludingGravity.x,
          y: e.accelerationIncludingGravity.y,
          z: e.accelerationIncludingGravity.z,
        })
      );
      setRotationRate((prev) =>
        Object.assign({}, prev, {
          alpha: e.rotationRate.alpha || 0,
          beta: e.rotationRate.beta || 0,
          gamma: e.rotationRate.gamma || 0,
        })
      );
    };

    const onDeviceOrientation = (e) => {
      setOrientation((prev) =>
        Object.assign({}, prev, { alpha: e.alpha || 0, beta: e.beta || 0, gamma: e.gamma || 0 })
      );
    };

    window.addEventListener("devicemotion", onDeviceMotion, true);
    window.addEventListener("deviceorientation", onDeviceOrientation, true);

    return () => {
      window.removeEventListener("devicemotion", onDeviceMotion);
      window.removeEventListener("deviceorientation", onDeviceOrientation);
    };
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
            <div>{orientation.beta.toFixed(2)}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>Y-axis (γ)</div>
            <div>{orientation.gamma.toFixed(2)}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>Z-axis (α)</div>
            <div>{orientation.alpha.toFixed(2)}</div>
          </div>
        </div>
        <div style={{ marginBottom: 10 }}>
          <div className="title">Accelerometer</div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>X-axis (β)</div>
            <div>{acceleration.x.toFixed(2)}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>Y-axis (γ)</div>
            <div>{acceleration.y.toFixed(2)}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>Z-axis (α)</div>
            <div>{acceleration.z.toFixed(2)}</div>
          </div>
        </div>
        <div style={{ marginBottom: 10 }}>
          <div className="title">Accelerometer including gravity</div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>X-axis (β)</div>
            <div>{accelerationIncludingGravity.x.toFixed(2)}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>Y-axis (γ)</div>
            <div>{accelerationIncludingGravity.y.toFixed(2)}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>Z-axis (α)</div>
            <div>{accelerationIncludingGravity.z.toFixed(2)}</div>
          </div>
        </div>
        <div style={{ marginBottom: 10 }}>
          <div className="title">Gyroscope</div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>X-axis (β)</div>
            <div>{rotationRate.beta.toFixed(2)}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>Y-axis (γ)</div>
            <div>{rotationRate.gamma.toFixed(2)}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>Z-axis (α)</div>
            <div>{rotationRate.alpha.toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sensor;
