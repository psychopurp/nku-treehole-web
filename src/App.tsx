import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { layoutRoutes } from "./router/utils";
import config from "./config";
import React, { Suspense } from "react";
import Loading from "./components/Loading";
import { IRoute } from "./router/router";

const App: React.FC = () => {
  return (
    <Suspense fallback={Loading()}>
      <Router basename={config.BASENAME}>
        {/* <ul>
          {layoutRoutes.map((route: IRoute, i) => (
            <li key={i}>
              {" "}
              <Link to={route.path}>{route.path} </Link>
            </li>
          ))}
        </ul> */}
        <Switch>
          {layoutRoutes.map((route: IRoute, i: number) => (
            <Route
              exact={route.exact}
              key={route.path}
              path={route.path}
              component={route.component}
            ></Route>
          ))}
        </Switch>
      </Router>
    </Suspense>
  );
};

export default App;
