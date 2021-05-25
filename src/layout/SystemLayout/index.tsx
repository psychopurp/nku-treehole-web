import React, { Suspense, useMemo } from "react";
import Loading from "../../components/Loading";
import { systemRoutes } from "../../router/utils";
import { CssBaseline, Grid, Paper } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { renderRouteList } from "../Auth";
import { Switch } from "react-router-dom";

const useStyles = makeStyles(({ palette, spacing, zIndex }: Theme) =>
  createStyles({
    root: {
      height: "100vh",
    },
    image: {
      backgroundImage: "url(https://source.unsplash.com/random)",
      backgroundRepeat: "no-repeat",
      backgroundColor:
        palette.type === "light" ? palette.grey[50] : palette.grey[900],
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
  })
);

const SystemLayout: React.FC = () => {
  const classes = useStyles();
  return (
    <div>
      <Grid container className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={2} md={7} className={classes.image} />
        <Grid
          item
          xs={12}
          sm={10}
          md={5}
          component={Paper}
          elevation={6}
          square
        >
          <MainRoutes />
        </Grid>
      </Grid>
    </div>
  );
};

export default SystemLayout;

function MainRoutes() {
  const Routes = useMemo(() => renderRouteList(systemRoutes), []);
  return (
    <Suspense fallback={Loading()}>
      <Switch>{Routes}</Switch>
    </Suspense>
  );
}
