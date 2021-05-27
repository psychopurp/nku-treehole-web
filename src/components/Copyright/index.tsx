import { Typography, Link } from "@material-ui/core";

export default function Copyright() {
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
