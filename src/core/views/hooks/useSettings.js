import { useState } from "react";
import { useObserver } from "hermes-io";
import * as CONSTANTS from "@constants";
import * as contexts from "@contexts/Hermes";
import { resolvePromise } from "@core/utils";
import observers from "@observers/Settings";
import ThemeObservers from "@observers/Theme";
import { getItemFromLocalStorage } from "@utils/storage";
import buildTheme from "@factory/Theme";
import useHost from './useHost';

const useSourceMap = () => {
  const [sourceMap, setSourceMap] = useState(null);

  const handleFetchSourceMap = async ({ value }, callback) => {
    const { ok, error, result } = await resolvePromise(fetchSourceMap(value.url, value.controller));
    if (ok) {
      setSourceMap(result);
      callback({ data: result, success: true, error: false });
      return;
    }
    console.log(error);
    const isRequestAborted = error.name === "AbortError";
    if (isRequestAborted) {
      return;
    }
    callback({ data: null, success: false, error });
  };

  useObserver({
    observer: observers.request,
    contexts: [contexts.sourceMapPicker],
    listener: handleFetchSourceMap,
  });
  return { sourceMap };
};

const fetchSourceMap = async (url = "", controller = {}) => {
  const res = await fetch(url, { signal: controller.signal });
  const data = await res.json();
  return data; 
};

const useSettings = () => {
  const [theme, setTheme] = useState(CONSTANTS.theme.modes.light);
  const [language, setLanguage] = useState("en");
  const host = useHost();
  const { sourceMap } = useSourceMap();
  const isSourceMapReady = !!sourceMap;
  const settings = {
    host,
    [CONSTANTS.SOURCEMAP_PATH]: getItemFromLocalStorage(CONSTANTS.SOURCEMAP_PATH),
    theme,
    setTheme,
    language,
    isSourceMapReady,
    sourceMap,
    setLanguage,
  };

  useObserver({
    observer: observers.selector,
    listener: ({ value }, callback) => callback(settings[value]),
    contexts: [contexts.selector],
  });

  useObserver({
    observer: ThemeObservers.change,
    listener: ({ value }) => setTheme(buildTheme(value)),
    contexts: [contexts.theme],
  });
  return settings;
};

export default useSettings;
