import {
  Grid,
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
import Copyright from "../../components/Copyright";

const useStyles = makeStyles(({ palette, spacing, zIndex }: Theme) =>
  createStyles({
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
    paper: {
      margin: spacing(8, 3),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
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

const Login: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const notice = useNoticeService();
  const userModel = useUserModel();
  const form = useRef<InputForm>({ email: "", password: "" });
  const { run, loading } = useRequest(apiUserLogin, {
    manual: true,
    onSuccess: ({ data }, params: [data: UserLoginData]) => {
      userModel.login(data);
      notice({
        type: "SnackBar",
        snackBarOptions: CustomSnackBar(),
      });
      // const url = new URLSearchParams(window.location.search);
      // const redirectURL = url.get("redirectURL");
      // if (redirectURL) {
      //   window.location.href = redirectURL;
      //   return;
      // }

      history.push("/");
    },
    onError: (error) => {
      console.log(error);
      notice({
        type: "SnackBar",
        snackBarOptions: { ...CustomSnackBar(error.message, false) },
      });
    },
  });

  const onClick = () => {
    run({
      email: form.current.email,
      password: form.current.password,
    });
  };

  return (
    <div className={classes.paper}>
      <Backdrop open={loading} className={classes.backDrop}>
        <CircularProgress />
      </Backdrop>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>

      <form className={classes.form} onSubmit={onClick}>
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
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
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
                history.push("/system/register");
              }}
            >
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </form>

      <Box mt={5}>
        <Copyright />{" "}
      </Box>
    </div>
  );
};

export default Login;
