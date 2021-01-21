import React, { useEffect, useState } from "react";
import Sensor from "../Sensor";
import GraphIcon from "./graph.svg";

const SensorsPanel = () => {
  const [showGraphs, setShowGraphs] = useState(true);
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
      console.log("e.rotateion reat", e.rotationRate);
      setAcceleration((prev) =>
        Object.assign({}, prev, {
          x: e.acceleration.x || 0,
          y: e.acceleration.y || 0,
          z: e.acceleration.z || 0,
        })
      );
      setAccelerationIncludingGravity((prev) =>
        Object.assign({}, prev, {
          x: e.accelerationIncludingGravity.x || 0,
          y: e.accelerationIncludingGravity.y || 0,
          z: e.accelerationIncludingGravity.z || 0,
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
    <>
      <div
        onClick={() => setShowGraphs(!showGraphs)}
        className="user-select-none"
        style={{
          position: "fixed",
          zIndex: 100,
          top: 5,
          left: 0,
          height: 42,
          width: 100,
          borderRadius: "0 25px 25px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "white",
          cursor: "pointer",
          boxShadow: "0px 0px 5px 2px rgba(0,0,0,0.1)",
        }}
      >
        <img src={GraphIcon}></img>
      </div>
      <div
        style={{
          position: "absolute",
          transition: "transform 0.3s",
          pointerEvents: showGraphs ? "all" : "none",
          transform: `translateX(${showGraphs ? 0 : "-100%"})`,
          left: 0,
          top: 0,
          zIndex: "99",
          width: "100%",
          maxHeight: "100%",
          overflow: "auto",
          display: "flex",
        }}
      >
        <div
          style={{
            paddingTop: 40,
            boxSizing: "border-box",
            borderRadius: "8px",
            width: "100%",
            zIndex: 99,
            display: "flex",
            flexWrap: "wrap",
            padding: "50px 10px 10px 10px",
          }}
        >
          <div style={{ padding: "10px", maxWidth: "500px", width: "100%" }}>
            <Sensor
              range={[-180, 360]}
              units={"°"}
              subject="Orientation"
              value={{ x: orientation.beta, y: orientation.gamma, z: orientation.alpha }}
            ></Sensor>
          </div>
          <div style={{ padding: "10px", maxWidth: "500px", width: "100%" }}>
            <Sensor
              range={[-15, 15]}
              subject="Accelerometer"
              value={acceleration}
              units="m/s²"
            ></Sensor>
          </div>
          <div style={{ padding: "10px", maxWidth: "500px", width: "100%" }}>
            <Sensor
              range={[-30, 30]}
              subject="Accelerometer including gravity"
              value={accelerationIncludingGravity}
              units="m/s²"
            ></Sensor>
          </div>
          <div style={{ maxWidth: "500px", width: "100%", padding: "10px" }}>
            <Sensor
              range={[-200, 200]}
              subject="Gyroscope"
              value={{ x: rotationRate.beta, y: rotationRate.gamma, z: rotationRate.alpha }}
            ></Sensor>
          </div>
        </div>
      </div>
    </>
  );
};

export default SensorsPanel;