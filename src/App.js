import React, { Suspense, useState, useRef, useEffect } from "react";
import RequestEmailForm from "components/RequestEmailForm";
import Loader from "components/Loader";
import { ThemeProvider } from "styled-components";
import { Route, Switch } from "react-router-dom";
import { BaseCSS } from "styled-bootstrap-grid";
import { getCookie } from "helpers";
import { useHistory } from "react-router-dom";

const MainApp = React.lazy(() => import("components/App"));

const theme = {
  main: "#073B4C",
  secondary: "#FFD166",
  danger: "#EF476F",
};

let watchId;

const StartWatchingGeolocation = (setUserLocation) => {
  function onLocationSuccess(position, setUserLocation) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setUserLocation([longitude, latitude]);
  }

  function onLocationError(er) {
    alert("No access to user location: " + er.message);
  }
  if (!navigator.geolocation) {
    alert("Browser doesn't support geolocation detector");
  } else {
    watchId = navigator.geolocation.watchPosition(
      (position) => onLocationSuccess(position, setUserLocation),
      onLocationError,
      {
        enableHighAccuracy: true,
      }
    );
  }
};

const StopWatchingLocation = () => {
  navigator.geolocation.clearWatch(watchId);
};

const App = () => {
  const [userLocation, setUserLocation] = useState([46.713001755456006, 24.819448316439964]);
  const [watchLocation, setWatchLocation] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (getCookie("secure-sensors-cookie")) {
      history.push("/app/" + Date.now());
    }
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <BaseCSS></BaseCSS>
      <Switch>
        <Route exact path="/">
          <RequestEmailForm></RequestEmailForm>
        </Route>
        <Route exact path="/app/:id">
          <Suspense fallback={<Loader></Loader>}>
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
          </Suspense>
        </Route>
      </Switch>
    </ThemeProvider>
  );
};
export default App;
