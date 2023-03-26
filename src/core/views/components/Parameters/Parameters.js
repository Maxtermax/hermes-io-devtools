import React from "react";
import { CopyBlock, tomorrowNightBlue } from "react-code-blocks";
import CopyClipboard from "@core/views/components/CopyClipboard/CopyClipboard";

const Parameters = (props = {}) => {
  const hasValue = props.value !== "";
  if (hasValue) {
    return (
      <>
        <CopyClipboard onCopy={props.onCopy} />
        <CopyBlock
          theme={tomorrowNightBlue}
          text={props.value}
          language={"jsx"}
        />
      </>
    );
  }
  return null;
};

export default Parameters;
