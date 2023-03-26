import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Logo = () => {
  return (
    <svg focusable="false" width="30px" style={{ color: "red" }} viewBox="0 0 24 24">
      <path d="M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.05-.08.07-.12C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.96 17.55 11 21 11 21z"></path>
    </svg>
  );
};

const Container = (props = {}) => {
  return (
    <Box
      sx={{
        display: "flex",
        placeContent: "center",
      }}
    >
      {props.children}
    </Box>
  );
};

const Title = () => (
  <Container>
    <Typography
      sx={{
        fontFamily: "Rubik Mono One",
        margin: "0px",
        fontSize: "30px",
        transform: "skew(-8deg, 0deg)",
      }}
      variant="subtitle1"
      display="block"
      gutterBottom
    >
      HM
    </Typography>
    <Logo />
  </Container>
);

export default Title;
