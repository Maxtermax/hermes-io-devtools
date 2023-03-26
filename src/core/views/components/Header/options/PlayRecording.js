import React from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const PlayRecording = (props = {}) => {
  const { onPlay = () => null } = props;
  return (
    <Tooltip title="Play recording">
      <IconButton onClick={onPlay} color="secondary" component="label">
        <PlayArrowIcon />
      </IconButton>
    </Tooltip>
  );
};

export default PlayRecording;
