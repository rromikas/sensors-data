let watchId;

export const StartWatchingGeolocation = (setUserLocation) => {
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

export const StopWatchingLocation = () => {
  navigator.geolocation.clearWatch(watchId);
};
