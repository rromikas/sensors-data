import React, { useEffect } from "react";
import ReactMapboxGl, { Marker } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { withTheme } from "styled-components";
import { getCookie } from "helpers";
import { useHistory } from "react-router-dom";

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAP_ACCESS_TOKEN,
});

const UserMarker = ({ color }) => {
  return (
    <div
      className="pulsating-circle"
      style={{
        pointerEvents: "none",
        width: 30,
        height: 30,
        borderRadius: "50%",
        border: "4px solid white",
        background: color,
        boxShadow: `0 0 0 1px ${color}`,
      }}
    ></div>
  );
};

const Component = ({ onReady, theme, userLocation }) => {
  const history = useHistory();
  useEffect(() => {
    if (!getCookie("secure-sensors-cookie")) {
      history.push("/");
    }
  }, [history]);
  return (
    <Map
      onStyleLoad={onReady}
      style="mapbox://styles/mapbox/streets-v9"
      center={userLocation}
      containerStyle={{
        height: "100%",
        width: "100%",
      }}
    >
      <Marker coordinates={userLocation} style={{ pointerEvents: "none" }}>
        <UserMarker color={theme.danger}></UserMarker>
      </Marker>
    </Map>
  );
};

export default withTheme(Component);
