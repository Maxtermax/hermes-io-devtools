import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Greeting = () => {
  return (
    <Box
      sx={{
        height: "calc(100% - 50px)",
        position: "absolute",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="overline"
        gutterBottom
        sx={(theme) => ({
          fontSize: "16px",
          color: theme.palette.secondary.main,
        })}
      >
        Start recording by clicking on the recording button above.
      </Typography>
    </Box>
  );
};

export default Greeting;
