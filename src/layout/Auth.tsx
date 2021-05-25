import { Redirect, useHistory } from "react-router-dom";
import { IRoute } from "../router/router";
import { getToken } from "../utils/cookie";
import config from "../config/index";
import { memo } from "react";
import { Route } from "react-router-dom";

export interface AuthProps {
  route: IRoute;
  children: React.ReactNode;
}

const Auth: React.FC<AuthProps> = ({ route, children }) => {
  const history = useHistory();

  // 需要登陆且未登陆
  if (route.auth && !getToken()) {
    return (
      <Redirect
        to={`/system/login?redirectURL=${encodeURIComponent(
          window.location.origin +
            config.BASENAME +
            history.location.pathname +
            history.location.search
        )}`}
      />
    );
  }

  if (route.redirect) {
    return <Redirect to={route.redirect} push />;
  }

  return <>{children}</>;
};

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

export default memo(Auth);
