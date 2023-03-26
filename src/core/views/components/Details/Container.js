import React from "react";
import Box from "@mui/material/Box";

const Container = React.forwardRef((props, ref) => (
  <Box ref={ref} sx={{ marginTop: "50px" }}>
    {props.children}
  </Box>
));

export default Container;
