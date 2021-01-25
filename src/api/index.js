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

const queuingStrategy = new CountQueuingStrategy({ highWaterMark: 1 });
const writableStream = new WritableStream(
  {
    write(chunk) {
      console.log("chunk", chunk);
      return new Promise((resolve, reject) => {
        resolve();
      });
    },
    abort(err) {
      console.log("Sink error:", err);
    },
  },
  queuingStrategy
);
const defaultWriter = writableStream.getWriter();

function sendMessage(message, writableStream) {
  defaultWriter.ready
    .then(() => {
      return defaultWriter.write(message);
    })
    .then(() => {
      console.log("Chunk written to sink.");
    })
    .catch((err) => {
      console.log("Chunk error:", err);
    });
  // Call ready again to ensure that all chunks are written
  //   before closing the writer.
  defaultWriter.ready
    .then(() => {
      defaultWriter.close();
    })
    .then(() => {
      console.log("All chunks written");
    })
    .catch((err) => {
      console.log("Stream error:", err);
    });
}

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
