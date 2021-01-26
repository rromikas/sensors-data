import React, { useState, useEffect, useRef, Suspense } from "react";
import Sensors from "components/SensorsPanel";
import styled, { withTheme } from "styled-components";
import { getCookie } from "helpers";
import GraphIcon from "images/Graph";
import Cursor from "images/Cursor";
import RequestEmailForm from "components/RequestEmailForm";
import Loader from "components/Loader";
import { Flipper } from "react-flip-toolkit";
const Map = React.lazy(() => import("components/Map"));

const Navbar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 99;
  display: flex;
  justify-content: space-between;
  height: 130px;
  padding: 20px;
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
  const [graphView, setGraphView] = useState(false);
  const watchLocationButton = useRef(null);
  const [pageRendered, setPageRendered] = useState(false);
  const [cookie, setCookie] = useState(getCookie("secure-sensors-cookie"));
  const [sensorsOn, setSensorsOn] = useState(false);

  useEffect(() => {
    watchLocationButton.current.click();
    setPageRendered(true);
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
          <div>{cookie ? cookie.split("@")[0] : ""}</div>
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
          <div id="sensors-button"></div>
        </div>
      </Navbar>
      <Flipper flipKey={cookie}>
        {!cookie && <RequestEmailForm setCookie={setCookie}></RequestEmailForm>}
      </Flipper>
      <div style={{ height: "70vh", maxHeight: 679 }}>
        {pageRendered && (
          <Suspense fallback={<Loader></Loader>}>
            <Map userLocation={userLocation} />
          </Suspense>
        )}
      </div>
      <Sensors graphView={graphView} sensorsOn={sensorsOn} setSensorsOn={setSensorsOn}></Sensors>
    </div>
  );
};

export default withTheme(App);
