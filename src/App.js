import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { BaseCSS } from "styled-bootstrap-grid";
import { getCookie } from "helpers";
import { useHistory } from "react-router-dom";
import MainApp from "components/App";
import { StartWatchingGeolocation, StopWatchingLocation } from "sensors/geolocation";

const theme = {
  main: "#073B4C",
  secondary: "#FFD166",
  danger: "#EF476F",
};

const App = () => {
  const [userLocation, setUserLocation] = useState([46.713001755456006, 24.819448316439964]);
  const [watchLocation, setWatchLocation] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (getCookie("secure-sensors-cookie")) {
      history.push("/app/" + Date.now());
    }
  }, [history]);

  return (
    <ThemeProvider theme={theme}>
      <BaseCSS></BaseCSS>
      <MainApp
        userLocation={userLocation}
        watchLocation={watchLocation}
        startWatchingLocation={() => {
          StartWatchingGeolocation(setUserLocation);
          setWatchLocation(true);
        }}
        stopWatchingLocation={() => {
          StopWatchingLocation();
          setWatchLocation(false);
        }}
      ></MainApp>
    </ThemeProvider>
  );
};
export default App;
