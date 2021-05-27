import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

export interface AppBarProps {}

const CustomAppBar: React.FC<AppBarProps> = () => {
  return (
    <AppBar>
      <Toolbar>
        <Typography variant="subtitle1">首页</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
