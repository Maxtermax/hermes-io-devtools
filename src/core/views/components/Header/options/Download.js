import React from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DownloadIcon from "@mui/icons-material/Download";

const Download = (props = {}) => {
  const { onDownload = () => {} } = props;
  return (
    <Tooltip title="Download recording">
      <IconButton onClick={onDownload} color="secondary" component="label">
        <DownloadIcon />
      </IconButton>
    </Tooltip>
  );
};

export default Download;
