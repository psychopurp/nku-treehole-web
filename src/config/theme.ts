import red from "@material-ui/core/colors/red";
import { createMuiTheme } from "@material-ui/core/styles";

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#13d6be",
    },
    secondary: {
      main: "#56ddcc",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
    type: "light",
  },

  typography: {},
});

export default theme;
