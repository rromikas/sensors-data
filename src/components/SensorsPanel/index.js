import React, { useEffect, useState } from "react";
import Sensor from "../Sensor";
import { SendSensorData } from "api";
import { Container, Row, Col } from "styled-bootstrap-grid";
import styled from "styled-components";

const Button = styled.button`
  max-width: 270px;
  width: 100%;
  height: 40px;
  font-size: 18px;
  font-weight: 600;
  background: ${(props) => props.theme.main};
  color: ${(props) => props.theme.secondary};
  cursor: pointer;
  border-radius: 34px;
  outline: 0;
  border: none;
  transition: background 0.2s;
  &:hover {
    background: #052833;
  }
  &:active {
    background: #041b23;
  }
`;

const SensorsPanel = ({ graphView }) => {
  const [showGraphs, setShowGraphs] = useState(true);
  const [orientation, setOrientation] = useState({ alpha: 0, beta: 0, gamma: 0 });
  const [acceleration, setAcceleration] = useState({ x: 0, y: 0, z: 0 });
  const [accelerationIncludingGravity, setAccelerationIncludingGravity] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [rotationRate, setRotationRate] = useState({ alpha: 0, beta: 0, gamma: 0 });
  const [sensorsOn, setSensorsOn] = useState(false);

  useEffect(() => {
    const onDeviceMotion = (e) => {
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
    if (sensorsOn) {
      var ua = navigator.userAgent.toLowerCase();
      if (ua.indexOf("safari") != -1) {
        if (ua.indexOf("chrome") > -1) {
          window.addEventListener("devicemotion", onDeviceMotion);
          window.addEventListener("deviceorientation", onDeviceOrientation);
        } else {
          alert("browser is safari");
          if (
            typeof DeviceMotionEvent !== "undefined" &&
            typeof DeviceMotionEvent.requestPermission === "function"
          ) {
            DeviceMotionEvent.requestPermission()
              .then((response) => {
                if (response == "granted") {
                  window.addEventListener("devicemotion", onDeviceMotion);
                }
              })
              .catch(console.error);
          } else {
            alert("DeviceMotionEvent is not defined");
          }
          if (
            typeof DeviceOrientationEvent !== "undefined" &&
            typeof DeviceOrientationEvent.requestPermission === "function"
          ) {
            DeviceOrientationEvent.requestPermission()
              .then((response) => {
                if (response == "granted") {
                  window.addEventListener("deviceorientation", onDeviceOrientation);
                }
              })
              .catch(console.error);
          } else {
            alert("DeviceOrientationEvent is not defined");
          }
        }
      }
    }

    return () => {
      window.removeEventListener("devicemotion", onDeviceMotion);
      window.removeEventListener("deviceorientation", onDeviceOrientation);
    };
  }, [sensorsOn]);

  return (
    <Container style={{ width: "100%", maxWidth: 1000, padding: "10px 0 50px 0" }}>
      <div style={{ padding: "1rem 1.5rem 0rem 1.5rem" }}>
        <Button onClick={() => setSensorsOn(!sensorsOn)}>
          {sensorsOn ? "Turn sensors off" : "Turn sensors on"}
        </Button>
      </div>

      <Row style={{ marginLeft: 0, marginRight: 0 }}>
        <Col col={12} md={6} style={{ paddingLeft: 0, paddingRight: 0 }}>
          <Sensor
            labels={["X-axis (β)", "Y-axis (γ)", "Z-axis (α)"]}
            graphView={graphView}
            id="orientation"
            sendSensorData={SendSensorData}
            range={[-200, 380]}
            units={"°"}
            subject="Orientation"
            value={{ x: orientation.beta, y: orientation.gamma, z: orientation.alpha }}
          ></Sensor>
        </Col>
        <Col col={12} md={6} style={{ paddingLeft: 0, paddingRight: 0 }}>
          <Sensor
            graphView={graphView}
            id="accelerometer"
            sendSensorData={SendSensorData}
            range={[-10, 10]}
            subject="Accelerometer"
            value={acceleration}
            units="m/s²"
          ></Sensor>
        </Col>
      </Row>
      <Row style={{ marginLeft: 0, marginRight: 0 }}>
        <Col col={12} md={6} style={{ paddingLeft: 0, paddingRight: 0 }}>
          <Sensor
            graphView={graphView}
            id="accelerometerIncludingGravity"
            sendSensorData={SendSensorData}
            range={[-30, 30]}
            subject="Accelerometer including gravity"
            value={accelerationIncludingGravity}
            units="m/s²"
          ></Sensor>
        </Col>
        <Col col={12} md={6} style={{ paddingLeft: 0, paddingRight: 0 }}>
          <Sensor
            graphView={graphView}
            id="gyroscope"
            sendSensorData={SendSensorData}
            range={[-220, 220]}
            subject="Gyroscope"
            value={{ x: rotationRate.beta, y: rotationRate.gamma, z: rotationRate.alpha }}
          ></Sensor>
        </Col>
      </Row>
    </Container>
  );
};

export default SensorsPanel;
