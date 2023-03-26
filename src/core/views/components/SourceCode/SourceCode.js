import React from "react";
import { CopyBlock, tomorrowNightBlue } from "react-code-blocks";
import Typography from "@mui/material/Typography";
import Spinner from "@core/views/components/Spinner/Spinner";
import VSHyperlink from "@core/views/components/VSHyperLink/VSHyperLink";
import useSourceMapObject from "@core/views/hooks/useSourceMapObject/useSourceMapObject";

const buildHighLightLines = ({ start, end }) => {
  if (start === end) return `${start + 1}-${end + 1}`;
  return `${start + 1}-${end + 1}`;
};

const SourceCode = (props = {}) => {
  const { stackTrace = "", name = "" } = props;
  const {
    code = "",
    highlight = {},
    hasSourceMap = false,
  } = useSourceMapObject({ stackTrace, name });
  const { source, line, column } = useSourceMapObject({ stackTrace, name });

  if (!hasSourceMap) {
    return (
      <Typography
        sx={{ width: "500px", paddingLeft: "10px", paddingTop: "10px" }}
        variant="overline"
        display="block"
      >
        No sourcemap available. 
      </Typography>
    );
  }
  if (!code) return <Spinner />;
  return (
    <>
      <VSHyperlink link={`vscode://file${source}:${line}:${column}`} />
      <CopyBlock
        highlight={buildHighLightLines(highlight)}
        theme={tomorrowNightBlue}
        text={code}
        language={"jsx"}
      />
    </>
  );
};

export default SourceCode;
