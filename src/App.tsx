import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, CssBaseline, Grid } from "@mui/material";
import Aside_drawer from "./components/Aside_drawer";
import FileInput from "./components/FileInput";

function App() {
  const [colorMode, setColorMode] = useState<"light" | "dark">("dark");
  const [menuOpen, setMenuOpen] = useState(false);

  const themeLight = createTheme({
    typography: {
      fontFamily: ["REM", "sans-serif"].join(","),
    },
    palette: {
      background: {
        default: "#fff",
        paper: "#F3F6FD",
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

  const themeDark = createTheme({
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

  return (
    <ThemeProvider theme={colorMode === "light" ? themeLight : themeDark}>
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
      <Grid container>
        <Grid item id="aside" xs={0} sm={4} lg={2} xl={1.5}>
          <Box
            sx={{ backgroundColor: "primary.dark" }}
            width={"100%"}
            height={"1000px"}
          ></Box>
        </Grid>
        <Grid item id="main" xs={12} sm={8} lg={8} xl={9}>
          <FileInput />
        </Grid>
        <Grid item id="right" xs={12} sm={12} lg={2} xl={1.5}>
          <Box width={"100%"} height={"1000px"}></Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
