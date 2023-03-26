import React from "react";
import ReplayIcon from "@mui/icons-material/Replay";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const Replay = (props = {}) => {
  const { onReplay = () => {} } = props;
  return (
    <>
      <Tooltip title="Replay">
        <IconButton onClick={onReplay} color="secondary" component="label">
          <ReplayIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default Replay;
