import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import routes, { IRoute } from "./router/router";
import config from "./config";
import React, { Suspense } from "react";
import { CircularProgress, Box, makeStyles } from "@material-ui/core";

const App: React.FC = () => {
  return (
    <Suspense fallback={Loading()}>
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
          {routes.map((route: IRoute, index: number) => (
            <Route
              key={config.BASENAME + route.path}
              path={route.path}
              exact={true}
              strict={route.strict}
              component={route.component}
            ></Route>
          ))}
        </Switch>
      </Router>
    </Suspense>
  );
};

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#fff333",
    height: "80vh",
  },
});

const Loading = (): React.ReactElement => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <CircularProgress />
    </Box>
  );
};

export default App;
