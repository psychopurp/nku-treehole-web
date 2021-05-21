import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import routes, { IRoute } from "./router/router";
import config from "./config";
import React, { Suspense } from "react";
import {
  Backdrop,
  CircularProgress,
  Box,
  createStyles,
  makeStyles,
} from "@material-ui/core";

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
