import Alert from "@material-ui/lab/Alert";
import { SnackbarProps } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import styles from "./index.module.less";

const CustomSnackBar = (
  msg: string = "Success !",
  success: boolean = true,
  duration: number = 600
): SnackbarProps => {
  return {
    autoHideDuration: duration,
    anchorOrigin: { vertical: "bottom", horizontal: "center" },
    children: (
      <div className={styles.root}>
        <Alert
          icon={<CheckIcon fontSize="inherit" />}
          severity={success ? "success" : "error"}
        >
          {msg}
        </Alert>
      </div>
    ),
  };
};

export default CustomSnackBar;
