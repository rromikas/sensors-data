import React, { useEffect, useState } from "react";
import ReactMapboxGl, { Marker } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

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

const Mark = () => {
  return (
    <div
      style={{
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        backgroundColor: "red",
        pointerEvents: "none",
      }}
    ></div>
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
        <Mark></Mark>
      </Marker>
    </Map>
  );
};

export default Component;
