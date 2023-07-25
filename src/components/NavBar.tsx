import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import logo from "../assets/logo.png";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import LightModeIcon from "@mui/icons-material/LightMode";

interface Props {
  colorMode: string;
  toggleColorMode: () => void;
}

const NavBar = ({ colorMode, toggleColorMode }: Props) => {
  return (
    <AppBar position="static" sx={{ margin: 0 }} color="primary">
      <Toolbar color="inherit">
        <img width="100px" src={logo} />
        <Typography
          align="left"
          variant="h6"
          component="div"
          flexGrow={1}
          color="inherit"
        >
          ENLIGHTENED PANDA
        </Typography>
        <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="secondary">
          {colorMode === "dark" ? <NightsStayIcon /> : <LightModeIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
