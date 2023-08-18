import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";

interface Props {
  menuOpen: boolean;
  setMenuOpen: () => void;
  file: File | undefined;
  setScreen: (scr: string) => void;
}

const Aside_drawer = ({ menuOpen, setMenuOpen, file, setScreen }: Props) => {
  const drawerWidth = "300px";

  const drawer = (
    <div>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "right",
          height: "100px",
          color: "primary",
        }}
      >
        <IconButton
          sx={{ ml: 1, color: "text.primary" }}
          onClick={setMenuOpen}
          edge="start"
        >
          <MenuOpenIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List>
        <ListItem key="details" disablePadding>
          <ListItemButton
            disabled={file ? false : true}
            onClick={() => {
              setScreen("Details");
              setMenuOpen();
            }}
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
            onClick={() => {
              setScreen("bivariate");
              setMenuOpen();
            }}
          >
            <ListItemIcon>
              <BarChartIcon sx={{ color: "text.primary" }} />
            </ListItemIcon>
            <ListItemText primary={"Bivariate Graphs"} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );
  return (
    <Drawer
      variant="temporary"
      open={menuOpen}
      sx={{
        display: { xs: "block", sm: "none" },
        "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
      }}
    >
      {drawer}
    </Drawer>
  );
};

export default Aside_drawer;
