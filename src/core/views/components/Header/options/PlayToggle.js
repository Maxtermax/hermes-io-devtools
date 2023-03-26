import React from "react";
import IconButton from "@mui/material/IconButton";
import PauseIcon from "@mui/icons-material/Pause";
import Tooltip from "@mui/material/Tooltip";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const PlayToggle = (props = {}) => {
  const { paused = false, onPause = () => null, onResume = () => null } = props;

  if (paused) {
    return (
      <Tooltip title="Resume">
        <IconButton onClick={onResume} color="secondary" component="label">
          <PlayArrowIcon />
        </IconButton>
      </Tooltip>
    );
  }
  return (
    <Tooltip title="Pause reproduction">
      <IconButton onClick={onPause} color="secondary" component="label">
        <PauseIcon />
      </IconButton>
    </Tooltip>
  );
};

export default PlayToggle;
