import { Avatar, Divider, Grid, Paper, Typography } from "@material-ui/core";
import AppBar from "../../components/AppBar";
import useUserModel from "../../store/useUserModel";
import styles from "./index.module.less";

export interface ProfileProps {}

const Profile: React.FC = () => {
  const { userInfo } = useUserModel();
  const avatar = () => {
    return userInfo.avatar === "" ? userInfo.name.slice(0, 2) : userInfo.avatar;
  };

  return (
    <div>
      {/* <AppBar className={styles.appbar} title="profile" /> */}

      <Grid container className={styles.root}>
        <Grid item className={styles.avatarContainer} component={Paper}>
          <div>
            {userInfo.avatar === "" ? (
              <Avatar alt="Avatar" className={styles.avatar}>
                {userInfo.name.slice(0, 2)}
              </Avatar>
            ) : (
              <Avatar
                alt="Avatar"
                className={styles.avatar}
                src={userInfo.avatar}
              />
            )}
          </div>
          <Typography className={styles.name}>{userInfo.name}</Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
