import React from "react";
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const DrawerButton = ({ onClick = () => null }) => (
  <Tooltip title="History">
    <IconButton onClick={onClick} color="secondary" component="label">
      <MenuIcon />
    </IconButton>
  </Tooltip>
);

export default DrawerButton;
