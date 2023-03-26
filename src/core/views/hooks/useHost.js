import { useState, useEffect } from "react";

export default function useHost() {
  const [host, setHost] = useState("");
  useEffect(() => {
    window.addEventListener("message", function handleMessage({ data = {} }) {
      const { source = "", payload = "" } = data;
      if (source === "content") {
        setHost(payload);
      }
    });

    window.postMessage(
      { source: "hermes-io-devtools", payload: "GET_ORIGIN" },
      "*"
    );
  }, []);
  return host;
}
