import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./config/theme";
import { CssBaseline } from "@material-ui/core";
import { NoticeServiceProvider } from "./components/NoticeService";

ReactDOM.render(
  <NoticeServiceProvider>
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <App />
    </ThemeProvider>
  </NoticeServiceProvider>,
  document.getElementById("root")
);
