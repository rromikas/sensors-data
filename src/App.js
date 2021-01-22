import React, { useEffect, useState, Suspense } from "react";
import Sensors from "components/SensorsPanel";
import RequestEmailForm from "components/RequestEmailForm";
import { getCookie } from "helpers";
import Loader from "components/Loader";
const Map = React.lazy(() => import("components/Map"));

const App = () => {
  const [isCookieSet, setIsCookieSet] = useState(getCookie("secure-sensors-cookie"));
  const [isMapLoaded, setMapLoaded] = useState(false);
  const [isPageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    setPageLoaded(true);
  }, []);

  return (
    isPageLoaded && (
      <>
        {!isCookieSet && <RequestEmailForm setIsCookieSet={setIsCookieSet}></RequestEmailForm>}
        <Suspense fallback={<div></div>}>
          <Map onReady={() => setMapLoaded(true)}></Map>
        </Suspense>
        {isMapLoaded ? <Sensors></Sensors> : <Loader></Loader>}
      </>
    )
  );
};
export default App;
