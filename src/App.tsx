import styles from "./App.module.less";
import Button from "@material-ui/core/Button";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import routes, { IRoute } from "./router/router";
import config from "./config";
import React, { Suspense } from "react";
import { Backdrop, CircularProgress, Box } from "@material-ui/core";

function App() {
  return (
    <Suspense fallback={loading()}>
      <Router basename={config.BASENAME}>
        {/* <ul>
          {routes.map((route: IRoute) => (
            <li>
              {" "}
              <Link to={route.path}>{route.path} </Link>
            </li>
          ))}
        </ul> */}
        <Switch>
          {routes.map((route: IRoute) => (
            <Route
              exact
              path={route.path}
              component={route.component}
              key={config.BASENAME + route.path}
            ></Route>
          ))}
        </Switch>
      </Router>
    </Suspense>
  );
}

function loading() {
  return (
    <Box>
      <Backdrop open>
        <CircularProgress />
      </Backdrop>
    </Box>
  );
}

export default App;
