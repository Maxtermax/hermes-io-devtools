import React from "react";
import MuiList from "@mui/material/List";

const List = ({ children, id = '' }) => (
  <MuiList key={id} sx={{ marginBottom: "-30px" }}>
    {children}
  </MuiList>
);

export default List;
