import React from "react";
import Typography from "@mui/material/Typography";

const Title = ({ name = "" }) => (
  <Typography
    sx={(theme) => ({
      textTransform: "inherit",
      color: theme.palette.secondary.main,
      fontWeight: "bold",
    })}
    display="block"
    variant="subtitle1"
  >
    {name}
  </Typography>
);

export default Title;
