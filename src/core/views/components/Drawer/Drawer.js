import React from "react";
import MuiDrawer from "@mui/material/Drawer";
import Divider from '@mui/material/Divider';
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import PlayCircleFilledOutlinedIcon from "@mui/icons-material/PlayCircleFilledOutlined";
import Header from "./Header";

const Drawer = (props = {}) => {
  const {
    open = false,
    data = {},
    onSetRecording = () => null,
    onClose = () => null,
  } = props;
  const items = Object.keys(data);

  return (
    <MuiDrawer anchor={"left"} open={open} onClose={onClose}>
      <nav style={{ width: "300px" }}>
        <List
          subheader={
            <ListSubheader>
              <Header />
              <Divider />
            </ListSubheader>
          }
        >
          {items.length > 0
            ? items.map((item) => (
                <ListItem key={item} disablePadding>
                  <ListItemButton onClick={() => onSetRecording(item)}>
                    <ListItemIcon>
                      <PlayCircleFilledOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Recording" secondary="Test" />
                  </ListItemButton>
                </ListItem>
              ))
            : null}
        </List>
      </nav>
    </MuiDrawer>
  );
};

export default Drawer;
