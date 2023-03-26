import React from "react";
import ListItem from "@mui/material/ListItem";

const Item = (props) => (
  <ListItem
    ref={(el) => {
      if (props.playing) {
        props.anchor.current = el;
      }
    }}
    sx={{
      paddingTop: "40px",
      paddingBottom: "40px",
      paddingLeft: "0px",
      marginLeft: "0px",
      left: "-10px",
      scrollMargin: "30px",
      transition: "all 0.35s ease-in-out",
      "&:hover": {
        background: (theme = {}) => theme.palette.primary.main,
      },
    }}
  >
    {props.children}
  </ListItem>
);

export default Item;
