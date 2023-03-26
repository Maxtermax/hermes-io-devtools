import { useEffect } from "react";

const useContextMessage = (props = {}) => {
  const { contexts, setContexts } = props;
    useEffect(() => {
    const handleMessageFromHermesIO = (event = {}) => {
      const { data = {} } = event;
      const { payload, type, source } = data;
      if (source !== "hermes-io") return;
      if (type === "CONTEXT_SNAPSHOT") {
        contexts.push({ ...payload, playing: false });
        setContexts(contexts);
      }
    };
    window.addEventListener("message", handleMessageFromHermesIO);
    return () =>
      window.removeEventListener("message", handleMessageFromHermesIO);
  }, [setContexts, contexts]);
};

export default useContextMessage;

