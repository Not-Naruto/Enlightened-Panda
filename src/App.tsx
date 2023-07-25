import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

function App() {
  const [colorMode, setColorMode] = useState<"light" | "dark">("light");

  const theme = createTheme(
    {
      palette: {
        mode: colorMode,

        primary: {
          main: "#3f834a",
        },
        secondary: {
          main: "#ffffff",
        },
        error: {
          main: "#e5383b",
        },
        warning: {
          main: "#f48c06",
        },
      },
    },
    [colorMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar
        colorMode={colorMode}
        toggleColorMode={() =>
          setColorMode(colorMode === "dark" ? "light" : "dark")
        }
      />
    </ThemeProvider>
  );
}

export default App;
