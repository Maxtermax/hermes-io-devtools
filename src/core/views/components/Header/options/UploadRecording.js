import React from "react";
import Tooltip from "@mui/material/Tooltip";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import IconButton from "@mui/material/IconButton";

const UploadRecording = ({ onUploadRecording = () => null }) => (
  <Tooltip title="Upload recording">
    <IconButton onClick={onUploadRecording} color="secondary" component="label">
      <FileUploadIcon /> 
    </IconButton>
  </Tooltip>
);

export default UploadRecording;
