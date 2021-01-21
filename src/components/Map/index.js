import React, { useEffect, useState } from "react";
import ReactMapboxGl, { Marker } from "react-mapbox-gl";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import CenterIcon from "./center.svg";

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1Ijoicm9taWthcyIsImEiOiJjazg0b2ZrOWcwc25mM29xdHFlMHdwenpsIn0.EpdSDBQASiP_K00nvaMMRA",
});

function onLocationSuccess(position, setUserLocation) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  setUserLocation([longitude, latitude]);
}

function onLocationError(er) {
  alert("Error" + er.message);
}

const UserMarker = () => {
  return (
    <div
      className="pulsating-circle"
      style={{
        pointerEvents: "none",
        width: 30,
        height: 30,
        borderRadius: "50%",
        border: "4px solid white",
        background: "deepskyblue",
      }}
    ></div>
  );
};

const CenteringMarker = ({ setUserLocation }) => {
  return (
    <div
      style={{
        width: 50,
        height: 50,
        background: "white",
        position: "fixed",
        bottom: 20,
        right: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        boxShadow: "0px 0px 5px 2px rgba(0,0,0,0.1)",
        cursor: "pointer",
      }}
    >
      <img
        src={CenterIcon}
        onClick={() =>
          setUserLocation((prev) => {
            let arr = [...prev];
            arr[0] = arr[0] + 0.000000001;
            return arr;
          })
        }
        style={{
          width: 20,
          height: 20,
        }}
      ></img>
    </div>
  );
};

const Component = () => {
  const [userLocation, setUserLocation] = useState([54.91284224031921, 54.91284224031921]);

  useEffect(() => {
    let watchId;
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
    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  return (
    <Map
      style="mapbox://styles/mapbox/streets-v9"
      center={userLocation}
      containerStyle={{
        height: "100%",
        width: "100%",
      }}
    >
      <Marker coordinates={userLocation} style={{ pointerEvents: "none" }}>
        <UserMarker></UserMarker>
      </Marker>
      <CenteringMarker setUserLocation={setUserLocation}></CenteringMarker>
    </Map>
  );
};

export default Component;
