import React, { Suspense, useMemo } from "react";
import Loading from "../components/Loading";
import { Switch, useHistory } from "react-router-dom";
import { businessRoutes } from "../router/utils";
import { renderRouteList } from "./Auth";
import {
  BottomNavigationAction,
  BottomNavigation,
  Fab,
} from "@material-ui/core";
import styles from "./index.module.less";
import HomeIcon from "@material-ui/icons/Home";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AddIcon from "@material-ui/icons/Add";

const IndexLayout: React.FC = () => {
  const [value, setValue] = React.useState("/index/home");
  const history = useHistory();

  return (
    <div className={styles.root}>
      <MainRoutes />

      <BottomNavigation
        value={value}
        onChange={(event: React.ChangeEvent<{}>, newValue: string) => {
          console.log(newValue);
          history.push(newValue);
          setValue(newValue);
        }}
        showLabels
        className={styles.bottomNavigation}
      >
        <BottomNavigationAction
          label="首页"
          value="/index/home"
          icon={<HomeIcon />}
        />
        <Fab
          className={styles.addIcon}
          // size="medium"
          color="primary"
          aria-label="add"
        >
          <AddIcon />
        </Fab>
        <BottomNavigationAction
          label="个人"
          value="/index/profile"
          icon={<AccountCircleIcon />}
        />
      </BottomNavigation>
    </div>
  );
};

export default IndexLayout;

function MainRoutes() {
  const Routes = useMemo(() => renderRouteList(businessRoutes), []);

  return (
    <Suspense fallback={Loading()}>
      <Switch>{Routes}</Switch>
    </Suspense>
  );
}