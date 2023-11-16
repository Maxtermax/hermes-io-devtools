import React, { useCallback, useRef } from "react";
import Tooltip from "@mui/material/Tooltip";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import IconButton from "@mui/material/IconButton";

const Upload = (props = {}) => {
  const { onUploadRecording = () => {} } = props;
  const inputRef = useRef(null);

  const handleClick = useCallback((e) => {
    e.preventDefault();
    inputRef.current.click();
  }, []);

  const handleFileChange = (event) => {
    try {
      const { target = {} } = event;
      const { files = [] } = target;
      const [file] = files;
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = e.target.result;
        const recording = JSON.parse(fileContent);
        onUploadRecording(recording);
      };
      reader.readAsText(file);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Tooltip title="Upload recording">
      <IconButton color="secondary" component="label">
        <FileUploadIcon onClick={handleClick} />
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
