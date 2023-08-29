import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { createTheme } from "@mui/material/styles";
import { CssBaseline, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#090C02",
    },
    secondary: {
      main: "#F2E5D7",
    },
    text: {
      primary: "#F2E5D7",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
