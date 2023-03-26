import React from "react";
import Box from "@mui/material/Box";

const Wrapper = ({ children = null }) => (
  <Box
    sx={{
      width: "8px",
      background: (theme) => theme.palette.highLigth.main,
      borderRadius: "10px",
      height: "calc(100% - 138px)",
      position: "absolute",
      textAlign: "0px",
      top: "90px",
      left: "50px",
    }}
  >
    {children}
  </Box>
);

export default Wrapper;
