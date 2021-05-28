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
  const history = useHistory();
  const [value, setValue] = React.useState(history.location.pathname);

  return (
    <div className={styles.root}>
      <div className={styles.mainRoot}>
        <MainRoutes />
      </div>

      <BottomNavigation
        showLabels
        value={value}
        onChange={(event: React.ChangeEvent<{}>, newValue: string) => {
          history.push(newValue);
          setValue(newValue);
        }}
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
          onClick={() => {
            history.push("/post");
          }}
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
