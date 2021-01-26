import React, { useCallback, useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import Sensor from "components/Sensor";
import { SendSensorData } from "api";
import { Container, Row, Col } from "styled-bootstrap-grid";
import styled, { withTheme } from "styled-components";
import SensorIcon from "images/Sensor";
import { onDeviceMotion } from "sensors/deviceMotion";
import { onDeviceOrientation } from "sensors/deviceOrientation";
import { SubscribeGeolocation, UnsubscribeGeolocation } from "sensors/geolocation";

const SwitchButton = styled.div`
  height: 33px;
  width: 48px;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.main};
  background: ${(props) =>
    props.active ? (props.theme.main ? props.theme.main : "black") : "white"};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 5px;
`;

const SensorsButton = ({
  sensorsOn,
  TurnSensorsOn,
  TurnSensorsOff,
  theme,
  sensorsButtonRenderedOnce,
  setSensorsButtonRenderedOnce,
}) => {
  const TurnOnOffButtonRef = useRef();
  useEffect(() => {
    if (!sensorsButtonRenderedOnce) {
      TurnOnOffButtonRef.current.click();
      setSensorsButtonRenderedOnce(true);
    }
  }, []);
  return (
    <SwitchButton
      theme={theme}
      ref={TurnOnOffButtonRef}
      active={sensorsOn}
      onClick={() => {
        sensorsOn ? TurnSensorsOff() : TurnSensorsOn();
      }}
    >
      <SensorIcon color={sensorsOn ? theme.secondary : theme.main}></SensorIcon>
    </SwitchButton>
  );
};

const SensorsPanel = ({ graphView, sensorsOn, setSensorsOn, theme }) => {
  const [orientation, setOrientation] = useState({ alpha: 0, beta: 0, gamma: 0 });
  const [acceleration, setAcceleration] = useState({ x: 0, y: 0, z: 0 });
  const [accelerationIncludingGravity, setAccelerationIncludingGravity] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [rotationRate, setRotationRate] = useState({ alpha: 0, beta: 0, gamma: 0 });
  const [geoData, setGeoData] = useState({
    latitude: 0,
    longitude: 0,
    accuracy: 0,
    altitude: 0,
    altitudeAccuracy: 0,
    heading: 0,
    speed: 0,
  });

  const lastLocationFetchTimestamp = useRef(0);
  const timeGapBetweenLocationFetch = 20 * 1000; // miliseconds

  const [location, setLocaton] = useState({ country: "", city: "" });

  const [sensorsButtonRenderedOnce, setSensorsButtonRenderedOnce] = useState(false);

  const onDeviceMotionAssigned = useCallback(
    (e) => {
      onDeviceMotion(e, { setAcceleration, setAccelerationIncludingGravity, setRotationRate });
    },
    [onDeviceMotion]
  );

  const onDeviceOrientationAssigned = useCallback(
    (e) => {
      onDeviceOrientation(e, { setOrientation });
    },
    [onDeviceOrientation]
  );

  const TurnSensorsOn = useCallback(async () => {
    var ua = navigator.userAgent.toLowerCase();
    let errorOccured = false;
    if (ua.indexOf("safari") !== -1) {
      if (ua.indexOf("chrome") > -1) {
        window.addEventListener("devicemotion", onDeviceMotionAssigned);
        window.addEventListener("deviceorientation", onDeviceOrientationAssigned);
      } else {
        if (
          typeof DeviceMotionEvent !== "undefined" &&
          typeof DeviceMotionEvent.requestPermission === "function"
        ) {
          let res = await DeviceMotionEvent.requestPermission()
            .then((response) => {
              if (response === "granted") {
                window.addEventListener("devicemotion", onDeviceMotionAssigned);
                return "sucess";
              } else {
                return "error";
              }
            })
            .catch((er) => {
              return er.message;
            });
          alert("Res1 " + res);
          if (res !== "success") {
            errorOccured = true;
          }
        } else {
          alert("DeviceMotion is not supported in this browser");
        }
        if (
          typeof DeviceOrientationEvent !== "undefined" &&
          typeof DeviceOrientationEvent.requestPermission === "function"
        ) {
          let res = await DeviceOrientationEvent.requestPermission()
            .then((response) => {
              if (response === "granted") {
                window.addEventListener("deviceorientation", onDeviceOrientationAssigned);
                return "success";
              } else {
                return "error";
              }
            })
            .catch((er) => er.message);
          alert("Res2 " + res);
          if (res !== "success") {
            errorOccured = true;
          }
        } else {
          alert("DeviceOrientationEvent is not supported in this browser");
        }
      }
    }
    if (!errorOccured) {
      SubscribeGeolocation("geoData", (val) => {
        setGeoData((prev) =>
          Object.assign({}, prev, {
            latitude: val.latitude || 0,
            longitude: val.longitude || 0,
            accuracy: val.accuracy || 0,
            altitude: val.altitude || 0,
            altitudeAccuracy: val.altitudeAccuracy || 0,
            heading: val.heading || 0,
            speed: val.speed || 0,
          })
        );
      });
      setSensorsOn(true);
    }
  }, [onDeviceOrientationAssigned, onDeviceMotionAssigned]);

  // eslint-disable-next-line react-hooks/exhaustive-deps

  const TurnSensorsOff = useCallback(() => {
    window.removeEventListener("deviceorientation", onDeviceOrientationAssigned);
    window.removeEventListener("devicemotion", onDeviceMotionAssigned);
    UnsubscribeGeolocation("geoData");
    setSensorsOn(false);
  }, [onDeviceOrientation, onDeviceMotion]);

  useEffect(() => {
    ReactDOM.render(
      <SensorsButton
        sensorsButtonRenderedOnce={sensorsButtonRenderedOnce}
        setSensorsButtonRenderedOnce={setSensorsButtonRenderedOnce}
        theme={theme}
        sensorsOn={sensorsOn}
        TurnSensorsOff={TurnSensorsOff}
        TurnSensorsOn={TurnSensorsOn}
      ></SensorsButton>,
      document.getElementById("sensors-button")
    );
  }, [sensorsOn, TurnSensorsOn, TurnSensorsOff, sensorsButtonRenderedOnce, theme]);

  useEffect(() => {
    const getData = async () => {
      let res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${geoData.longitude},${geoData.latitude}.json?access_token=${process.env.REACT_APP_MAP_ACCESS_TOKEN}`
      ).then((res) => res.json());
      let region = res.features.find((x) => x.place_type.includes("region"));
      if (region) {
        setLocaton((prev) => Object.assign({}, prev, { city: region.text }));
      }
      let country = res.features.find((x) => x.place_type.includes("country"));
      if (country) {
        setLocaton((prev) => Object.assign({}, prev, { country: country.text }));
      }
    };

    let timestamp = Date.now();

    if (
      timestamp - lastLocationFetchTimestamp.current >= timeGapBetweenLocationFetch &&
      geoData.longitude !== 0 &&
      geoData.latitude !== 0
    ) {
      getData();
      lastLocationFetchTimestamp.current = timestamp;
    }
  }, [geoData]);

  return (
    <Container style={{ width: "100%", maxWidth: 1000, padding: "10px 0 50px 0" }}>
      <Row style={{ marginLeft: 0, marginRight: 0 }}>
        <Col col={12} md={6} style={{ paddingLeft: 0, paddingRight: 0 }}>
          <Sensor
            active={sensorsOn}
            labels={["X-axis (β)", "Y-axis (γ)", "Z-axis (α)"]}
            graphView={graphView}
            id="orientation"
            sendSensorData={SendSensorData}
            range={[-200, 380]}
            units={"°"}
            subject="Orientation"
            keys={["x", "y", "z"]}
            value={{ x: orientation.beta, y: orientation.gamma, z: orientation.alpha }}
          ></Sensor>
        </Col>
        <Col col={12} md={6} style={{ paddingLeft: 0, paddingRight: 0 }}>
          <Sensor
            active={sensorsOn}
            graphView={graphView}
            id="accelerometer"
            sendSensorData={SendSensorData}
            range={[-10, 10]}
            subject="Accelerometer"
            value={acceleration}
            units="m/s²"
            keys={["x", "y", "z"]}
          ></Sensor>
        </Col>
      </Row>
      <Row style={{ marginLeft: 0, marginRight: 0 }}>
        <Col col={12} md={6} style={{ paddingLeft: 0, paddingRight: 0 }}>
          <Sensor
            active={sensorsOn}
            graphView={graphView}
            id="accelerometerIncludingGravity"
            sendSensorData={SendSensorData}
            range={[-30, 30]}
            subject="Accelerometer including gravity"
            value={accelerationIncludingGravity}
            units="m/s²"
            keys={["x", "y", "z"]}
          ></Sensor>
        </Col>
        <Col col={12} md={6} style={{ paddingLeft: 0, paddingRight: 0 }}>
          <Sensor
            active={sensorsOn}
            graphView={graphView}
            id="gyroscope"
            sendSensorData={SendSensorData}
            range={[-220, 220]}
            subject="Gyroscope"
            value={{ x: rotationRate.beta, y: rotationRate.gamma, z: rotationRate.alpha }}
            keys={["x", "y", "z"]}
          ></Sensor>
        </Col>
      </Row>
      <Row style={{ marginLeft: 0, marginRight: 0 }}>
        <Col col={12} md={6} style={{ paddingLeft: 0, paddingRight: 0 }}>
          <Sensor
            active={sensorsOn}
            graphView={graphView}
            characterValue={location}
            id="geodata"
            sendSensorData={SendSensorData}
            subject="Geodata"
            value={geoData}
            keys={[
              "latitude",
              "longitude",
              "accuracy",
              "altitude",
              "altitude accuracy",
              "heading",
              "speed",
            ]}
            labels={[
              "latitude",
              "longitude",
              "accuracy",
              "altitude",
              "altitude accuracy",
              "heading",
              "speed",
            ]}
            characterValueLabels={["country", "city"]}
          ></Sensor>
        </Col>
      </Row>
    </Container>
  );
};

export default withTheme(SensorsPanel);
