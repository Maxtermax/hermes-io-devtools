import React from "react";
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import IconButton from "@mui/material/IconButton";

const PlayContext = ({ onSetContext = () => null, id = "" }) => (
  <IconButton
    onClick={() => onSetContext({ id })}
    sx={{
      background: "transparent",
      alignSelf: "flex-start",
      position: "relative",
      left: "28px",
      "&:hover": {
        background: "transparent",
      },
    }}
    size="large"
    color="secondary"
    component="label"
  >
    <PlayCircleFilledWhiteOutlinedIcon sx={{ fontSize: "30px" }} />
  </IconButton>
);

export default PlayContext;
