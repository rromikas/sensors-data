import React, { useEffect, useState } from "react";
import Map from "./components/Map";
import Sensors from "./components/SensorsPanel";
import RequestEmailForm from "components/RequestEmailForm";
import { getCookie, setCookie } from "helpers";

const App = () => {
  const [isCookieSet, setIsCookieSet] = useState(getCookie("secure-sensors-cookie") ? true : false);

  return (
    <>
      {!isCookieSet && <RequestEmailForm setIsCookieSet={setIsCookieSet}></RequestEmailForm>}
      <Map></Map>
      <Sensors></Sensors>
    </>
  );
};

export default App;
