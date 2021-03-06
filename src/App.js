import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { BaseCSS } from "styled-bootstrap-grid";
import MainApp from "components/App";
import {
  StartWatchingGeolocation,
  StopWatchingLocation,
  SubscribeGeolocation,
  UnsubscribeGeolocation,
} from "sensors/geolocation";

const theme = {
  main: "#073B4C",
  secondary: "#FFD166",
  danger: "#EF476F",
  chartColors: [
    "deeppink",
    "deepskyblue",
    "rebeccapurple",
    "chocolate",
    "orange",
    "seagreen",
    "slateblue",
    "lawngreen",
  ],
};

const App = () => {
  const [userLocation, setUserLocation] = useState([46.713001755456006, 24.819448316439964]);
  const [watchLocation, setWatchLocation] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <BaseCSS></BaseCSS>
      <MainApp
        userLocation={userLocation}
        watchLocation={watchLocation}
        startWatchingLocation={() => {
          SubscribeGeolocation("userLocation", (val) => {
            setUserLocation([val.longitude, val.latitude]);
          });
          StartWatchingGeolocation();
          setWatchLocation(true);
        }}
        stopWatchingLocation={() => {
          UnsubscribeGeolocation("userLocation");
          StopWatchingLocation();
          setWatchLocation(false);
        }}
      ></MainApp>
    </ThemeProvider>
  );
};
export default App;
