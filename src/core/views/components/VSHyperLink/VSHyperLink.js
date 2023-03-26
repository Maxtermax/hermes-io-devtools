import React from "react";
import Link from "@mui/material/Link";
import Wrapper from "./styles/Wrapper";
import Tooltip from "@mui/material/Tooltip";

const VSHyperLink = (props = {}) => {
  return (
    <Tooltip title={"Open"}>
      <Link href={props.link} variant="body2">
        <Wrapper>{props.children}</Wrapper>
      </Link>
    </Tooltip>
  );
};

export default VSHyperLink;
