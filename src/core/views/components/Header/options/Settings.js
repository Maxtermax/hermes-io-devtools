import React from "react";
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const Settings = ({ onClick = () => null }) => (
  <Tooltip title="Settings">
    <IconButton onClick={onClick} color="secondary" component="label">
      <SettingsIcon />
    </IconButton>
  </Tooltip>
);

export default Settings;
