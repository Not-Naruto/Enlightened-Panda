import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import { ThemeProvider } from "@mui/material/styles";
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
import { themeDark, themeLight } from "./theme";
import BivariateComponent from "./components/BivariateComponent";

function App() {
  const [colorMode, setColorMode] = useState<"light" | "dark">("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [file, setFile] = useState<File>();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [screen, setScreen] = useState("fileInput");

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
                    <LayersIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText sx={{ color: "white" }} primary={"Details"} />
                </ListItemButton>
              </ListItem>
              <ListItem key="bivariate" disablePadding>
                <ListItemButton
                  disabled={file ? false : true}
                  onClick={() => setScreen("bivariate")}
                >
                  <ListItemIcon>
                    <BarChartIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText
                    sx={{ color: "white" }}
                    primary={"Bivariate Graphs"}
                  />
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
            <BivariateComponent data={data} file={file} />
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
