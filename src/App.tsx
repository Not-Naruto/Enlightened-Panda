import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, Grid } from "@mui/material";
import Aside_drawer from "./components/Aside_drawer";

function App() {
  const [colorMode, setColorMode] = useState<"light" | "dark">("dark");
  const [menuOpen, setMenuOpen] = useState(false);

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
        toggleMenu={() => setMenuOpen(!menuOpen)}
      />
      <Aside_drawer
        menuOpen={menuOpen}
        setMenuOpen={() => setMenuOpen(!menuOpen)}
      />
    </ThemeProvider>
  );
}

export default App;
