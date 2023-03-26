import React from "react";
import Typography from "@mui/material/Typography";

const TimeStamp = ({ text = "" }) => (
  <Typography variant="subtitle1" display="block" gutterBottom>{text}</Typography>
);

export default TimeStamp;
