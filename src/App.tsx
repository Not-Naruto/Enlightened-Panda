import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Backdrop,
  Box,
  CircularProgress,
  CssBaseline,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Aside_drawer from "./components/Aside_drawer";
import FileInput from "./components/FileInput";
import Details from "./components/Details";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";

function App() {
  const [colorMode, setColorMode] = useState<"light" | "dark">("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [file, setFile] = useState<File>();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [screen, setScreen] = useState("fileInput");

  const themeLight = createTheme({
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

  return (
    <ThemeProvider theme={colorMode === "light" ? themeLight : themeDark}>
      <CssBaseline />
      <Backdrop
        sx={{
          color: "primary.main",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <NavBar
        colorMode={colorMode}
        toggleColorMode={() =>
          setColorMode(colorMode === "dark" ? "light" : "dark")
        }
        toggleMenu={() => setMenuOpen(!menuOpen)}
      />
      <Aside_drawer
        file={file}
        menuOpen={menuOpen}
        setMenuOpen={() => setMenuOpen(!menuOpen)}
        setScreen={(scr: string) => setScreen(scr)}
      />
      <Grid container>
        <Grid item id="aside" xs={0} sm={3.5} lg={2} xl={1.5}>
          <Box
            sx={{ backgroundColor: "primary.dark" }}
            width={"100%"}
            minHeight={"100vh"}
            height={"100%"}
          >
            <List sx={{ display: { xs: "none", sm: "block" } }}>
              <ListItem key="details" disablePadding>
                <ListItemButton
                  disabled={file ? false : true}
                  onClick={() => setScreen("Details")}
                >
                  <ListItemIcon>
                    <LayersIcon sx={{ color: "text.primary" }} />
                  </ListItemIcon>
                  <ListItemText primary={"Details"} />
                </ListItemButton>
              </ListItem>
              <ListItem key="comparison" disablePadding>
                <ListItemButton
                  disabled={file ? false : true}
                  onClick={() => setScreen("comparison")}
                >
                  <ListItemIcon>
                    <BarChartIcon sx={{ color: "text.primary" }} />
                  </ListItemIcon>
                  <ListItemText primary={"Compare Columns"} />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Grid>
        <Grid item id="main" xs={12} sm={8.5} lg={8} xl={9}>
          {screen === "fileInput" ? (
            <FileInput
              setData={(res) => setData(res)}
              setLoading={(res: boolean) => setLoading(res)}
              setFile={(res: any) => setFile(res)}
              setScreen={() => setScreen("Details")}
            />
          ) : screen === "Details" ? (
            <Details data={data} file={file} />
          ) : (
            <div>comparison</div>
          )}
        </Grid>
        <Grid item id="right" xs={12} sm={12} lg={2} xl={1.5}>
          <Box width={"100%"} minHeight={"100vh"} height={"100%"}></Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
