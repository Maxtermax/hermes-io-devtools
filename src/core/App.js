import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Layout from "@components/Layout";
import { ThemeProvider } from "@mui/material/styles";
import { useObserver } from "hermes-io";
import * as CONSTANTS from "@constants";
import TranslationsContext from "@contexts/Translations";
import ActionsContext from "@contexts/Actions";
import buildTheme from "@factory/Theme";
import buildTranslations from "@factory/Translations";
import buildActions from "@factory/Actions";
import ThemeObservers from "@observers/Theme";
import * as contexts from "@contexts/Hermes";
import observers from "@observers/Settings";
import useSettings from "@core/views/hooks/useSettings";

const translations = buildTranslations(CONSTANTS.LANGS.en);
const themeActions = buildActions(ThemeObservers);

function useLoadDefaultSourceMap({ sourceMap, sourceMapPath, host }) {
  useEffect(() => {
    async function loadSourceMap() {
      const { error, success } = await observers.request.notify({
        context: contexts.sourceMapPicker,
        value: {
         controller: new AbortController(),
         url: `${host}${sourceMapPath}`,
        },
      });
      console.log({ error, success });
    }
    if (sourceMapPath && !sourceMap) {
      loadSourceMap();
    }
  }, [host, sourceMap, sourceMapPath, contexts.sourceMapPicker]);
}

function App() {
  const { theme: selectedTheme, sourceMap, [CONSTANTS.SOURCEMAP_PATH]: sourceMapPath, host } = useSettings();
  const [theme, setTheme] = useState(buildTheme(selectedTheme));
  
  useLoadDefaultSourceMap({ sourceMap, sourceMapPath, host });
  useObserver({
    observer: themeActions[ThemeObservers.change],
    listener: ({ value }) => setTheme(buildTheme(value)),
    contexts: [contexts.theme],
  });
  return (
    <div>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <TranslationsContext.Provider value={translations}>
          <ActionsContext.Provider value={{ theme: themeActions }}>
            <Layout />
          </ActionsContext.Provider>
        </TranslationsContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
