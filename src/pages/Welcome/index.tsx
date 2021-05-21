import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Button, Grid, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(({ palette, spacing }: Theme) =>
  createStyles({
    root: {
      height: "100vh",
      //   backgroundColor: palette.primary.main,
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-around",
      padding: spacing(4, 4, 12),
    },
    title: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      //   backgroundColor: "#333fff",
    },
    enterButton: {
      borderRadius: 15,
      width: "60vw",
    },
  })
);

const Welcome: React.FC = () => {
  const classes = useStyles();
  let history = useHistory();

  function enterAppButton() {
    history.push("/login");
  }

  return (
    <Grid container className={classes.root}>
      <Grid item className={classes.title}>
        {" "}
        <Typography variant="h3" gutterBottom>
          树 洞
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          · 跟随内心找到你 ·
        </Typography>
      </Grid>

      <Grid item>
        <Button
          variant="contained"
          color="secondary"
          className={classes.enterButton}
          onClick={enterAppButton}
        >
          进入树洞
        </Button>
      </Grid>
    </Grid>
  );
};

export default Welcome;
