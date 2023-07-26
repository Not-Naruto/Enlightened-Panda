import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, CssBaseline, Grid } from "@mui/material";
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
      <Grid container>
        <Grid item id="aside" xs={0} sm={4} lg={2} xl={1.5}>
          <Box
            sx={{ backgroundColor: "primary.dark" }}
            width={"100%"}
            height={"100px"}
          ></Box>
        </Grid>
        <Grid item id="main" xs={12} sm={8} lg={8} xl={9}>
          <Box
            sx={{ backgroundColor: "secondary.dark" }}
            width={"100%"}
            height={"100px"}
          ></Box>
        </Grid>
        <Grid item id="right" xs={12} sm={12} lg={2} xl={1.5}>
          <Box
            sx={{ backgroundColor: "error.dark" }}
            width={"100%"}
            height={"100px"}
          ></Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
