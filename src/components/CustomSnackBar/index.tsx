import Alert, { AlertProps } from "@material-ui/lab/Alert";
import {
  createStyles,
  makeStyles,
  Snackbar,
  SnackbarProps,
  Theme,
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import styles from "./index.module.less";

const CustomSnackBar = (
  msg: string = "Success !",
  duration: number = 600
): SnackbarProps => {
  return {
    autoHideDuration: duration,
    anchorOrigin: { vertical: "bottom", horizontal: "center" },
    children: (
      <div className={styles.root}>
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          {msg}
        </Alert>
      </div>
    ),
  };
};

export default CustomSnackBar;
