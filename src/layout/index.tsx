import React, { Suspense, useMemo } from "react";
import Loading from "../components/Loading";
import { Route, Switch } from "react-router-dom";
import { businessRoutes } from "../router/utils";
import { IRoute } from "../router/router";
import Auth from "./Auth";

const IndexLayout: React.FC = () => {
  return (
    <div>
      <MainRoutes />
    </div>
  );
};

export default IndexLayout;

export const renderRouteList = (routes: IRoute[]) => {
  return routes.map((route) => {
    const { component: Component } = route;
    return (
      <Route
        key={route.path}
        exact={route.path !== "/*"}
        path={route.path}
        render={(props) => (
          <Auth {...props} route={route}>
            <Component {...props} />
          </Auth>
        )}
      ></Route>
    );
  });
};

function MainRoutes() {
  const Routes = useMemo(() => renderRouteList(businessRoutes), []);

  return (
    <Suspense fallback={Loading()}>
      <Switch>{Routes}</Switch>
    </Suspense>
  );
}
