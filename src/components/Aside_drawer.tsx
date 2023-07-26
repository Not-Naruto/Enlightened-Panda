import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  Toolbar,
} from "@mui/material";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

interface Props {
  menuOpen: boolean;
  setMenuOpen: () => void;
}

const Aside_drawer = ({ menuOpen, setMenuOpen }: Props) => {
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
        <IconButton sx={{ ml: 1 }} onClick={setMenuOpen} edge="start">
          <MenuOpenIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List>
        <ListItem>Test</ListItem>
        <ListItem>Test</ListItem>
        <ListItem>Test</ListItem>
        <ListItem>Test</ListItem>
      </List>
    </div>
  );
  return (
    <Drawer
      variant="temporary"
      open={menuOpen}
      sx={{
        "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
      }}
    >
      {drawer}
    </Drawer>
  );
};

export default Aside_drawer;
