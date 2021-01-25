const apiUrlOrigin = "https://google.com";

export const GetSecureCookie = (emailId) => {
  return fetch(`${apiUrlOrigin}/getSecureCookie`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ emailId }),
  })
    .then((res) => res.json())
    .catch((error) => {
      return { error };
    });
};

export const SendSensorData = (sensorType, sensorData) => {
  return fetch(`${apiUrlOrigin}/sendSensorData`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sensorType, sensorData, date: Date.now() }),
  })
    .then((res) => res.json())
    .catch((error) => {
      return { error };
    });
};
