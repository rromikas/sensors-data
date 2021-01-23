import React, { useEffect, useState } from "react";
import ReactMapboxGl, { Marker } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1Ijoicm9taWthcyIsImEiOiJjazg0b2ZrOWcwc25mM29xdHFlMHdwenpsIn0.EpdSDBQASiP_K00nvaMMRA",
});

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

const Component = ({ onReady }) => {
  const [userLocation, setUserLocation] = useState([54.91284224031921, 54.91284224031921]);

  useEffect(() => {
    function onLocationSuccess(position, setUserLocation) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setUserLocation([longitude, latitude]);
    }

    function onLocationError(er) {
      alert(
        "You previuosly denied permission tou see you geolocation. You can change this permission in browser settings"
      );
    }
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
      onStyleLoad={onReady}
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
    </Map>
  );
};

export default Component;
