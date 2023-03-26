import React from "react";
import Wrapper from "./Wrapper";
import { InternalBar } from "./InternalBar";

const VerticalBar = ({ playing = false }) => {
  return <Wrapper>{playing && <InternalBar />}</Wrapper>;
};

export default VerticalBar;
