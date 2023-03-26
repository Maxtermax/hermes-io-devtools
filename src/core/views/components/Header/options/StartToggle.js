import React from "react";
import IconButton from "@mui/material/IconButton";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import Tooltip from "@mui/material/Tooltip";

const StartToggle = (props = {}) => {
  const {
    recording = false,
    onStartRecording = () => null,
    onStopRecording = () => null,
  } = props;
  if (recording) {
    return (
      <Tooltip title="Stop recording">
        <IconButton onClick={onStopRecording} component="label">
          <RadioButtonCheckedIcon
            sx={(theme = {}) => ({
              color: theme.palette.recording.main,
            })}
          />
        </IconButton>
      </Tooltip>
    );
  }
  return (
    <Tooltip title="Start recording">
      <IconButton
        onClick={onStartRecording}
        color="secondary"
        component="label"
      >
        <RadioButtonCheckedIcon />
      </IconButton>
    </Tooltip>
  );
};

export default StartToggle;
