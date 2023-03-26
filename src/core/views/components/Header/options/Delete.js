import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";


const Delete = (props = {}) => {
  const { onDeleteRecording = () => {} } = props;
  return (
    <Tooltip title="Close recording">
      <IconButton
        onClick={onDeleteRecording}
        color="secondary"
        component="label"
      >
        <CloseIcon />
      </IconButton>
    </Tooltip>
  );
};

export default Delete;
