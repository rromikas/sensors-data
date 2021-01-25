import React, { useState, useEffect, useRef } from "react";
import Sensors from "components/SensorsPanel";
import Map from "components/Map";
import styled, { withTheme } from "styled-components";
import { getCookie } from "helpers";
import { useHistory } from "react-router-dom";
import GraphIcon from "images/Graph";
import Cursor from "images/Cursor";

const Navbar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 99;
  display: flex;
  justify-content: space-between;
  height: 130px;
  padding: 15px 30px;
  background: linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 74%);
`;

const SwitchButton = styled.div`
  height: 33px;
  width: 48px;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.main};
  background: ${(props) => (props.active ? props.theme.main : "white")};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 5px;
`;

const App = ({
  theme,
  userLocation,
  watchLocation,
  startWatchingLocation,
  stopWatchingLocation,
}) => {
  const [email, setEmail] = useState("");
  const [graphView, setGraphView] = useState(false);
  const history = useHistory();
  const watchLocationButton = useRef(null);

  useEffect(() => {
    let cookie = getCookie("secure-sensors-cookie");
    if (cookie) {
      setEmail(cookie);
    } else {
      history.push("/");
    }
  }, [history]);

  useEffect(() => {
    watchLocationButton.current.click();
  }, []);

  return (
    <div>
      <Navbar>
        <div
          style={{
            color: theme.main,
            fontSize: 24,
            lineHeight: "24px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          <div>Welcome,</div>
          <div>{email.split("@")[0]}</div>
        </div>
        <div>
          <SwitchButton active={graphView} onClick={() => setGraphView(!graphView)}>
            <GraphIcon color={graphView ? theme.secondary : theme.main}></GraphIcon>
          </SwitchButton>
          <SwitchButton
            ref={watchLocationButton}
            active={watchLocation}
            onClick={watchLocation ? stopWatchingLocation : startWatchingLocation}
          >
            <Cursor color={watchLocation ? theme.secondary : theme.main}></Cursor>
          </SwitchButton>
        </div>
      </Navbar>
      <div style={{ height: "70vh", maxHeight: 679 }}>
        <Map userLocation={userLocation}></Map>
      </div>
      <Sensors graphView={graphView}></Sensors>
    </div>
  );
};

export default withTheme(App);
