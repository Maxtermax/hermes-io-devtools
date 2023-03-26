import React from "react";
import Box from "@mui/material/Box";

const Wrapper = ({ children = [] }) => {
  return (
    <Box
      sx={{
        paddingTop: "20px",
        display: "grid",
        gridTemplateColumns: "40px 1fr",
        gap: "11px",
        alignContent: "stretch",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        "& > div": { borderRadius: "15px", padding: "5px" },
        "& button": { visibility: "hidden" },
      }}
    >
      {children}
    </Box>
  );
};

export default Wrapper;
