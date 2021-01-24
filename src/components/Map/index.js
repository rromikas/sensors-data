import React, { useEffect, useState } from "react";
import ReactMapboxGl, { Marker } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { withTheme } from "styled-components";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1Ijoicm9taWthcyIsImEiOiJjazg0b2ZrOWcwc25mM29xdHFlMHdwenpsIn0.EpdSDBQASiP_K00nvaMMRA",
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
