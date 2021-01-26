let watchId;
const subscribers = {};

export const SubscribeGeolocation = (id, onValue) => {
  subscribers[id] = onValue;
};

export const UnsubscribeGeolocation = (id) => {
  delete subscribers[id];
};

export const StartWatchingGeolocation = () => {
  function onLocationSuccess(position) {
    Object.values(subscribers).forEach((x) => x(position.coords));
  }

  function onLocationError(er) {
    alert("No access to user location: " + er.message);
  }
  if (!navigator.geolocation) {
    alert("Browser doesn't support geolocation detector");
  } else {
    watchId = navigator.geolocation.watchPosition(
      (position) => onLocationSuccess(position),
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
