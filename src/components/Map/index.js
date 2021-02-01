import React, { useState } from "react";
import ReactMapboxGl, { Marker } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { withTheme } from "styled-components";

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAP_ACCESS_TOKEN,
});

const markerStyle = (color) => {
  return {
    pointerEvents: "none",
    width: 30,
    height: 30,
    borderRadius: "50%",
    border: "4px solid white",
    background: color,
    boxShadow: `0 0 0 1px ${color}`,
  };
};

const UserMarker = ({ color }) => {
  return <div style={markerStyle(color)}></div>;
};

const NotMyLocationMarker = ({ name, theme }) => {
  return (
    <div style={markerStyle("#2065ff")}>
      <div
        style={{
          color: "#2065ff",
          position: "absolute",
          fontWeight: "bold",
          top: -23,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        {name}
      </div>
    </div>
  );
};

function isNumeric(str) {
  if (typeof str != "string") return false;
  return !isNaN(str) && !isNaN(parseFloat(str));
}

const isNotMyLocationValid = (location) => {
  if (location.length === 2 && isNumeric(location[0]) && isNumeric(location[1])) {
    return true;
  }
  return false;
};

const Component = ({ onReady, theme, userLocation, notMyLocation, notMyLocationName }) => {
  const [zoom, setZoom] = useState(11);
  return (
    <Map
      onZoom={(x) => setZoom(x.getZoom())}
      onStyleLoad={onReady}
      style="mapbox://styles/mapbox/streets-v9"
      center={userLocation}
      containerStyle={{
        height: "100%",
        width: "100%",
      }}
      zoom={[zoom]}
    >
      {isNotMyLocationValid(notMyLocation) && notMyLocationName && notMyLocationName.length < 30 && (
        <Marker coordinates={notMyLocation.map((x) => +x)} style={{ pointerEvents: "none" }}>
          <NotMyLocationMarker theme={theme} name={notMyLocationName}></NotMyLocationMarker>
        </Marker>
      )}

      <Marker coordinates={userLocation} style={{ pointerEvents: "none" }}>
        <UserMarker color={theme.danger}></UserMarker>
      </Marker>
    </Map>
  );
};

export default withTheme(Component);
