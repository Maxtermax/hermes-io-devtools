import { useState } from "react";
import useSourceMapObject from "@core/views/hooks/useSourceMapObject/useSourceMapObject";

const useHyperLink = ({ stackTrace = "", name = "" }) => {
  const [hyperlink, setHyperlink] = useState("");
  const { source, line, column } = useSourceMapObject({ stackTrace, name });
  const isReadyToSetup = source !== "" && hyperlink === "";
  if (isReadyToSetup) {
    setHyperlink(`vscode://file${source}:${line}:${column}`);
  }
  return hyperlink;
};

export default useHyperLink;
