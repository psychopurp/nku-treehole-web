import React, { useEffect, useRef } from "react";
import AppBar, { AppBarProps as ABProps } from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import styles from "./index.module.less";

export interface AppBarProps extends ABProps {
  title: string;
}

const CustomAppBar: React.FC<AppBarProps> = ({ title, ...props }) => {
  // const appBar = useRef<HTMLElement>(null);
  // const height = useRef<string>("");
  // useEffect(() => {
  //   console.log(appBar.current?.clientHeight);
  //   if (appBar.current?.clientHeight) {
  //     height.current = `${appBar.current.clientHeight}px`;
  //   }
  // }, []);

  return (
    <div>
      <AppBar {...props} className={styles.appbar} position="relative">
        <Toolbar>
          <Typography variant="subtitle1">{title}</Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default CustomAppBar;
