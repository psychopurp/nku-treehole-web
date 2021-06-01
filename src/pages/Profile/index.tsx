import AppBar from "../../components/AppBar";
import styles from "./index.module.less";

export interface ProfileProps {}

const Profile: React.FC = () => {
  return (
    <div>
      <AppBar className={styles.appbar} title="profile" />
      Profile
    </div>
  );
};

export default Profile;
