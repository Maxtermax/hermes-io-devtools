import React, { useRef } from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FileUploadIcon from "@mui/icons-material/FileUpload";

const Upload = (props = {}) => {
  const { onUpload = () => {} } = props;
  const inputRef = useRef(null);
  const handleClick = () => {
    inputRef.current.click();
  };
  const handleFileChange = (event) => {
    const { target = {} } = event;
    const { files = [] } = target;
    const [file] = files;
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileContent = e.target.result;
      onUpload(JSON.parse(fileContent));
    };
    reader.readAsText(file);
  };
  return (
    <Tooltip title="Download recording">
      <IconButton onClick={handleClick} color="secondary" component="label">
        <FileUploadIcon />
        <input
          accept="application/json"
          onChange={handleFileChange}
          type="file"
          ref={inputRef}
          style={{ visibility: "hidden" }}
        />
      </IconButton>
    </Tooltip>
  );
};

export default Upload;
