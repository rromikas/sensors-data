import React, { useState } from "react";
import Map from "components/Map";
import Sensors from "components/SensorsPanel";
import RequestEmailForm from "components/RequestEmailForm";
import { getCookie } from "helpers";

const App = () => {
  const [isCookieSet, setIsCookieSet] = useState(getCookie("secure-sensors-cookie"));
  const [isSystemLoaded, setIsSystemLoaded] = useState(false);

  return (
    <>
      {!isCookieSet && <RequestEmailForm setIsCookieSet={setIsCookieSet}></RequestEmailForm>}
      <Map onReady={() => setIsSystemLoaded(true)}></Map>
      {isSystemLoaded && <Sensors></Sensors>}
    </>
  );
};

export default App;
