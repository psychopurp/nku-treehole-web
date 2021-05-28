import CustomAppBar from "../../components/AppBar";

export interface ProfileProps {}

const Profile: React.FC = () => {
  return (
    <div>
      <CustomAppBar title="profile" />
      Profile
    </div>
  );
};

export default Profile;
