import React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const Spinner = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <CircularProgress color="secondary" />
    </Box>
  );
};

export default Spinner;
