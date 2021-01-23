import React, { Suspense } from "react";
import RequestEmailForm from "components/RequestEmailForm";
import Loader from "components/Loader";
import { ThemeProvider } from "styled-components";
import { Route, Switch } from "react-router-dom";
import { BaseCSS } from "styled-bootstrap-grid";
const MainApp = React.lazy(() => import("components/App"));

const theme = {
  main: "#073B4C",
  secondary: "#FFD166",
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BaseCSS></BaseCSS>
      <Switch>
        <Route exact path="/">
          <RequestEmailForm></RequestEmailForm>
        </Route>
        <Route exact path="/app/:id">
          <Suspense fallback={<Loader></Loader>}>
            <MainApp></MainApp>
          </Suspense>
        </Route>
      </Switch>
    </ThemeProvider>
  );
};
export default App;
