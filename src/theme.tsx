import { createTheme } from "@mui/material";

export const themeLight = createTheme({
  typography: {
    fontFamily: ["REM", "sans-serif"].join(","),
  },
  palette: {
    background: {
      default: "#FAF9F6",
      paper: "#f5eadf",
    },
    primary: {
      main: "#3f834a",
    },
    secondary: {
      main: "#ffffff",
    },
    error: {
      main: "#e5383b",
      dark: "#331A1A",
    },
    warning: {
      main: "#f48c06",
    },
  },
});

export const themeDark = createTheme({
  typography: {
    fontFamily: ["REM", "sans-serif"].join(","),
  },
  palette: {
    background: {
      default: "#1c1c1c",
      paper: "#333333",
    },
    text: {
      primary: "#fff",
    },
    primary: {
      main: "#2a5a33",
    },
    secondary: {
      main: "#ffffff",
    },
    error: {
      main: "#e5383b",
      dark: "#331A1A",
    },
    warning: {
      main: "#f48c06",
    },
  },
});
