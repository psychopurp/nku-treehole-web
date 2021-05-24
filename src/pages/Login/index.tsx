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
import CheckIcon from "@material-ui/icons/Check";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { useRef, useState } from "react";
import { apiUserLogin, UserLoginData } from "../../api/userService";
import useUserModel from "../../store/useUserModel";
import { useRequest } from "ahooks";
import noticeService, {
  useNoticeService,
} from "../../components/NoticeService";
import Alert from "@material-ui/lab/Alert";
import { Snackbar, SnackbarProps } from "@material-ui/core";
import CustomSnackBar from "../../components/CustomSnackBar";

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
    paper: {
      margin: spacing(8, 3),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: spacing(1),
      backgroundColor: palette.primary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: spacing(1),
      // backgroundColor: "yellow",
    },
    submit: {
      margin: spacing(3, 0, 2),
    },

    backDrop: {
      zIndex: zIndex.drawer + 1,
    },
  })
);

interface InputForm {
  email: string;
  password: string;
}

export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const notice = useNoticeService();

  const userModel = useUserModel();
  const form = useRef<InputForm>({ email: "", password: "" });
  const { run, loading } = useRequest(apiUserLogin, {
    manual: true,
    onSuccess: ({ data }, params: [data: UserLoginData]) => {
      // console.log(data, params);
      userModel.login(data);
      notice({
        type: "SnackBar",
        snackBarOptions: CustomSnackBar(data.name),
      });

      // history.push("/home");
    },
    onError: (error) => {
      console.log(error);
      notice({
        type: "SnackBar",
        snackBarOptions: { ...CustomSnackBar(error.message) },
      });
    },
  });

  const onClick = () => {
    run({
      account: form.current.email,
      password: form.current.password,
    });
  };

  return (
    <Grid container className={classes.root}>
      <Backdrop open={loading} className={classes.backDrop}>
        <CircularProgress />
      </Backdrop>
      <CssBaseline />
      <Grid item xs={false} sm={2} md={7} className={classes.image} />
      <Grid item xs={12} sm={10} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <div className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              onChange={(event) => {
                form.current.email = event.target.value;
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(event) => {
                form.current.password = event.target.value;
              }}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onClick}
            >
              Sign In
            </Button>

            <Grid container>
              <Grid item xs>
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => {
                    history.push("/welcome");
                  }}
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => {
                    history.push("/register");
                  }}
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </div>

          <Box mt={5}>
            <Copyright />{" "}
          </Box>
        </div>
      </Grid>
    </Grid>
  );
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        南开树洞
      </Link>
      {" 2021."}
    </Typography>
  );
}
