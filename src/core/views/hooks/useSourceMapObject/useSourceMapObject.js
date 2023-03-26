import { useState, useEffect } from "react";
import * as contexts from "@contexts/Hermes";
import useSourceMapConsumer from "@core/views/hooks/useSourceMapConsumer";
import settings from "@observers/Settings";
import processText from "./processText";
import extractLocationFromStackTrace from "./extractLocationFromStackTrace";

const useSourceMapObject = ({ stackTrace = "", name = "" }) => {
  const [srcObject, setSrcObject] = useState({
    hasSourceMap: false,
    source: "",
    code: "",
    line: 0,
    column: 0,
  });
  const sourceMapConsumer = useSourceMapConsumer();
  useEffect(() => {
    const buildObject = async () => {
      const sourceMap = await settings.selector.notify({
        value: "sourceMap",
        context: contexts.selector,
      });
      if (!sourceMap) return;
      sourceMapConsumer.with(sourceMap, null, (consumer) => {
        const stackTracePositions = extractLocationFromStackTrace({
          stackTrace,
          name,
        });
        const { source, line, column } =
          consumer.originalPositionFor(stackTracePositions);
        const content = consumer.sourcesContent[column];
        const contentByLines = content.split(/\n/g);
        const start = contentByLines.findIndex((line) => line.includes(name));
        const highlightLine = contentByLines[line - 1];
        const { container = {}, highlight = {} } = processText({
          text: contentByLines,
          start,
          highlightLine,
        });
        let code = contentByLines
          .slice(start, container.end + 1)
          .join("\n");
        setSrcObject({ source, code, content, line, column, highlight, hasSourceMap: true });
      });
    };
    buildObject();
  }, []);
  return srcObject;
};

export default useSourceMapObject;
