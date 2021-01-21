import React, { useEffect, useState } from "react";
import Sensor from "../Sensor";

const SensorsPanel = () => {
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
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        padding: "20px",
        boxSizing: "border-box",
        borderRadius: "8px",
        width: "100%",
        maxHeight: "100%",
        overflowY: "auto",
        zIndex: 99,
      }}
    >
      <div style={{ marginBottom: "10px" }}>
        <Sensor
          units={"°"}
          subject="Orientation"
          value={{ x: orientation.beta, y: orientation.gamma, z: orientation.alpha }}
        ></Sensor>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <Sensor subject="Accelerometer" value={acceleration} units="m/s²"></Sensor>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <Sensor
          subject="Accelerometer including gravity"
          value={accelerationIncludingGravity}
          units="m/s²"
        ></Sensor>
      </div>
      <Sensor
        subject="Gyroscope"
        value={{ x: rotationRate.beta, y: rotationRate.gamma, z: rotationRate.alpha }}
      ></Sensor>
    </div>
  );
};

export default SensorsPanel;
