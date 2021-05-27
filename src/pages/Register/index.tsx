import {
  Avatar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Grid,
  Link,
  TextField,
  Typography,
} from "@material-ui/core";
import styles from "./index.module.less";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useRef } from "react";
import { useHistory } from "react-router-dom";
import Copyright from "../../components/Copyright";
import { useNoticeService } from "../../components/NoticeService";
import useUserModel from "../../store/useUserModel";
import { useRequest } from "ahooks";
import CustomSnackBar from "../../components/CustomSnackBar";
import { apiUserRegister, UserLoginData } from "../../api/userService";

interface InputForm {
  email: string;
  password: string;
  userName: string;
}

const Register: React.FC = () => {
  const form = useRef<InputForm>({ email: "", password: "", userName: "" });
  const history = useHistory();
  const notice = useNoticeService();
  const userModel = useUserModel();
  const { run, loading } = useRequest(apiUserRegister, {
    manual: true,
    onSuccess: ({ data }, params: [data: UserLoginData]) => {
      userModel.login(data);
      notice({
        type: "SnackBar",
        snackBarOptions: CustomSnackBar(data.name),
      });

      history.push("/index/home");
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
      userName: form.current.userName,
      email: form.current.email,
      password: form.current.password,
    });
  };

  return (
    <div className={styles.root}>
      <Backdrop open={loading} className={styles.backDrop}>
        <CircularProgress />
      </Backdrop>
      <Avatar className={styles.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Register
      </Typography>

      <form className={styles.form} onSubmit={onClick}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="userName"
          label="Username"
          autoComplete="Username"
          onChange={(event) => {
            form.current.userName = event.target.value;
          }}
        />
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
          className={styles.submit}
          // onClick={onClick}
        >
          Sign Up
        </Button>

        <Grid container justify="flex-end">
          <Grid item>
            <Link
              component="button"
              variant="body2"
              onClick={() => {
                history.push("/system/login");
              }}
            >
              {"Already have an account? Sign in"}
            </Link>
          </Grid>
        </Grid>
      </form>

      <Box mt={5}>
        <Copyright />
      </Box>
    </div>
  );
};

export default Register;
