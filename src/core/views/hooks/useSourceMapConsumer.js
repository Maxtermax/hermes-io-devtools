import React from "react";

window.sourceMap.SourceMapConsumer.initialize({
  "lib/mappings.wasm": "/build/mappings.wasm",
});

const useSourceMapConsumer = () => {
  return window.sourceMap.SourceMapConsumer;
};

export default useSourceMapConsumer;
