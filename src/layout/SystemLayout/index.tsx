import React, { Suspense, useMemo } from "react";
import Loading from "../../components/Loading";
import { Route, Switch } from "react-router-dom";
import { businessRoutes, systemRoutes } from "../../router/utils";
import { IRoute } from "../../router/router";
import {
  CssBaseline,
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  Link,
  Box,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { useRef } from "react";
import { apiUserLogin, UserLoginData } from "../../api/userService";
import useUserModel from "../../store/useUserModel";
import { useRequest } from "ahooks";
import { useNoticeService } from "../../components/NoticeService";
import CustomSnackBar from "../../components/CustomSnackBar";
import Auth from "../Auth";
import { renderRouteList } from "../index";

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
