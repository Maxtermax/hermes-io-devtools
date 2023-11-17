import { useState, useEffect } from "react";
import * as contexts from "@contexts/Hermes";
import useSourceMapConsumer from "@core/views/hooks/useSourceMapConsumer";
import settings from "@observers/Settings";
import processText from "./processText";
import extractLocationFromStackTrace from "./extractLocationFromStackTrace";
import extractNameFromStackTrace from "./extractNameFromStackTrace";

const useSourceMapObject = ({ stackTrace = "" }) => {
  const [srcObject, setSrcObject] = useState({
    hasSourceMap: false,
    source: "",
    code: "",
    line: 0,
    column: 0,
  });
  const sourceMapConsumer = useSourceMapConsumer();
  const name = extractNameFromStackTrace(stackTrace);
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
        const position = consumer.originalPositionFor(stackTracePositions);
        const { source = '', line, column } = position;
        const index = consumer._absoluteSources.indexOf(source);
        const content = consumer.sourcesContent[index];
        if (!content) return setSrcObject({ source, code: "", content: "", hasSourceMap: false }); 
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
    try {
      buildObject();
    } catch (error) {
      console.error(error);
    } 
  }, []);
  return srcObject;
};

export default useSourceMapObject;
