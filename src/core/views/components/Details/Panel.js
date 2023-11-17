import React from "react";
import Card from "@mui/material/Card";

const Panel = ({ children }) => (
  <Card
    elevation={0}
    sx={{
      background: "transparent",
      paddingLeft: "40px",
      paddingTop: "10px",
      paddingBottom: "10px",
      borderRadius: "0px",
      width: "100%",
    }}
  >
    {children}
  </Card>
);

export default Panel;
