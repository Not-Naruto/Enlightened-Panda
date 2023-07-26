import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import logo from "../assets/logo.png";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu";

interface Props {
  colorMode: string;
  toggleColorMode: () => void;
  toggleMenu: () => void;
}

const NavBar = ({ colorMode, toggleColorMode, toggleMenu }: Props) => {
  return (
    <AppBar position="static" sx={{ margin: 0 }} color="primary">
      <Toolbar color="inherit">
        <IconButton
          sx={{ ml: 1, display: { xs: "block", sm: "none" } }}
          color="secondary"
          onClick={toggleMenu}
        >
          <MenuIcon />
        </IconButton>
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
