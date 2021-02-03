import React, { useState, useEffect, useRef, Suspense } from "react";
import Sensors from "components/SensorsPanel";
import styled, { withTheme } from "styled-components";
import { getCookie, setCookie as setBrowserCookie } from "helpers";
import GraphIcon from "images/Graph";
import Cursor from "images/Cursor";
import RequestEmailForm from "components/RequestEmailForm";
import Loader from "components/Loader";
import LogoutIcon from "images/Logout";
import { Clipboard } from "components/Clipboard";
import { Flipper } from "react-flip-toolkit";
import { useHistory } from "react-router-dom";

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
  padding: 1rem;
  background: linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 74%);
  align-items: flex-start;
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
  const history = useHistory();

  useEffect(() => {
    watchLocationButton.current.click();
    setPageRendered(true);
  }, []);

  const logout = () => {
    setBrowserCookie("secure-sensors-cookie", "", -2);
    setCookie("");
    setGraphView(false);
    history.push("/");
  };

  const sharedUrlDetails = window.location.pathname.substring(1).split("-");

  return (
    <div>
      <Navbar>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              color: theme.main,
              fontSize: 24,
              lineHeight: "24px",
              fontWeight: "bold",
              textAlign: "center",
              marginRight: 20,
            }}
          >
            <div>Welcome,</div>
            <div style={{ opacity: !cookie ? 0 : 1 }}>
              {cookie ? cookie.split("@")[0] : "empty"}
            </div>
          </div>
          <LogoutIcon
            color={theme.main}
            onClick={logout}
            style={{ cursor: "pointer" }}
          ></LogoutIcon>
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
          <Clipboard
            theme={theme}
            urlToCopy={
              window.location.origin +
              "/" +
              userLocation.join("-") +
              "-" +
              (cookie ? cookie.split("@")[0] : "")
            }
          ></Clipboard>
        </div>
      </Navbar>
      <Flipper flipKey={cookie}>
        {!cookie && <RequestEmailForm setCookie={setCookie}></RequestEmailForm>}
      </Flipper>
      <div style={{ height: "70vh", maxHeight: 679 }}>
        {pageRendered && (
          <Suspense fallback={<Loader></Loader>}>
            <Map
              userLocation={userLocation}
              notMyLocation={sharedUrlDetails.length === 3 ? sharedUrlDetails.slice(0, 2) : []}
              notMyLocationName={sharedUrlDetails.length === 3 ? sharedUrlDetails[2] : ""}
            />
          </Suspense>
        )}
      </div>
      <Sensors graphView={graphView} sensorsOn={sensorsOn} setSensorsOn={setSensorsOn}></Sensors>
    </div>
  );
};

export default withTheme(App);
