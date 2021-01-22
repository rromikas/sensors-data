import React, { useState } from "react";
import Map from "components/Map";
import Sensors from "components/SensorsPanel";
import RequestEmailForm from "components/RequestEmailForm";
import { getCookie } from "helpers";

const App = () => {
  const [isCookieSet, setIsCookieSet] = useState(getCookie("secure-sensors-cookie"));

  return (
    <>
      {!isCookieSet && <RequestEmailForm setIsCookieSet={setIsCookieSet}></RequestEmailForm>}
      <Map></Map>
      <Sensors></Sensors>
    </>
  );
};

export default App;
