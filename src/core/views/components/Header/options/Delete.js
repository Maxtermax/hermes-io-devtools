import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";


const Delete = (props = {}) => {
  const { onDeleteRecording = () => {} } = props;
  return (
    <Tooltip title="Delete recording">
      <IconButton
        onClick={onDeleteRecording}
        color="secondary"
        component="label"
      >
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
};

export default Delete;
