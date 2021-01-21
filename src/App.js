import React, { useEffect } from "react";
import Map from "./components/Map";
import Sensors from "./components/SensorsPanel";

const App = () => {
  return (
    <>
      <Map></Map>
      <Sensors></Sensors>
    </>
  );
};

export default App;
