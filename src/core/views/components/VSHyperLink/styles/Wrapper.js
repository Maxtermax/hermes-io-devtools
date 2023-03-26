import React, { useState, useEffect } from "react";
import LaunchIcon from "@mui/icons-material/Launch";
import Box from "@mui/material/Box";

const Wrapper = ({ children = null }) => (
  <Box
    sx={{
      display: "flex",
      color: (theme) => theme.palette.secondary.main,
      justifyContent: "space-evenly",
      alignItems: "center",
      gap: "8px",
    }}
  >
    <LaunchIcon />
    {children}
  </Box>
);

export default Wrapper;
