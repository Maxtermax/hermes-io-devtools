import React, { useState } from "react";
import Header from "@components/Header/Header";
import Details from "@components/Details/Details";
import Settings from "@components/Settings/Settings";
import Drawer from "@core/views/components/Drawer/Drawer";
import useFocusScroll from "./hooks/useFocusScroll";
import useContextMessage from "./hooks/useContextMessage";

const anchorRef = React.createRef(null);
const TIME_INTERVAL = 1000;
let internvalId;
let itemPlayingIndex = 0;
let recordingId = "";

const Layout = () => {
  const [recording, setRecording] = useState(false);
  const [displayDrawer, setDisplayDrawer] = useState(false);
  const [paused, setPaused] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [progress, setProgress] = useState(0);
  const [contexts, setContexts] = useState([]);
  const [collection, setCollection] = useState({});

  useFocusScroll({ anchor: anchorRef });
  useContextMessage({ contexts, setContexts });

  const handleStartRecording = () => {
    setRecording(true);
    window.postMessage(
      { source: "hermes-io-devtools", payload: "START_RECORDING" },
      "*"
    );
  };

  const handleStopRecoding = () => {
    setRecording(false);
    window.postMessage(
      { source: "hermes-io-devtools", payload: "STOP_RECORDING" },
      "*"
    );
    recordingId = new Date().getTime();
    const newCollection = { ...collection };
    newCollection[recordingId] = [...contexts];
    setCollection(newCollection);
  };

  const handleSetContext = (payload = {}) => {
    window.postMessage(
      {
        source: "hermes-io-devtools",
        payload: { type: "SET_CONTEXT", id: payload.id },
      },
      "*"
    );
    const newContexts = contexts.map((context) => ({
      ...context,
      playing: payload.id === context.id,
    }));
    setContexts(newContexts);
  };

  const getCurrentDateTime = () => {
    const currentDate = new Date();
    const dateString = currentDate.toLocaleDateString(); // Get the date portion
    const timeString = currentDate.toLocaleTimeString(); // Get the time portion
    return dateString + " " + timeString;
  }

  const handleDownload = () => {
    const data = JSON.stringify(contexts);
    const blob = new Blob([data], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = getCurrentDateTime(); 
    link.click();
  }

  const handleUpload = (newContexts) => {
    setContexts(newContexts);
    console.log('upload');
  }

  const updateProgress = () => {
    if (contexts[itemPlayingIndex]) {
      const newContexts = contexts.map((context) => ({
        ...context,
        playing: false,
      }));
      const nextItem = newContexts[itemPlayingIndex];
      nextItem.playing = true;
      const { id = "" } = nextItem;
      handleSetContext({ id });
      itemPlayingIndex++;
      const newProgress = (itemPlayingIndex / contexts.length) * 100;
      setProgress(newProgress);
      if (newProgress >= 100) {
        clearInterval(internvalId);
      }
      setContexts([...newContexts]);
    }
  };

  const handlePlay = () => {
    if (internvalId) {
      clearInterval(internvalId);
    }
    itemPlayingIndex = 0;
    updateProgress();
    internvalId = setInterval(updateProgress, TIME_INTERVAL);
  };

  const handleReplay = () => {
    setTimeout(() => {
      window.screenTop = 0;
      anchorRef.current = null;
      setProgress(0);
      handlePlay();
    }, 500);
  };

  const handleResume = () => {
    setPaused(false);
    updateProgress();
    internvalId = setInterval(updateProgress, TIME_INTERVAL);
  };

  const handlePause = () => {
    if (internvalId) {
      clearInterval(internvalId);
    }
    setPaused(true);
    setProgress((itemPlayingIndex / contexts.length) * 100);
  };

  const handleDeleteRecording = () => {
    itemPlayingIndex = 0;
    setProgress(0);
    setContexts([]);
    setRecording(false);
    if (internvalId) {
      clearInterval(internvalId);
    }
    window.postMessage(
      { source: "hermes-io-devtools", payload: "RESET_RECORDING" },
      "*"
    );
  };

  const handleSettings = () => setShowSettings(true);

  const toggleDrawer = () => setDisplayDrawer(!displayDrawer);

  const handleSetRecording = (key = "") => {
    const newRecording = collection[key] || contexts || [];
    itemPlayingIndex = 0;
    anchorRef.current = null;
    setProgress(0);
    setRecording(false);
    setContexts(newRecording);
    if (internvalId) {
      clearInterval(internvalId);
    }
  };

  const handleCloseSettings = () => setShowSettings(false);

  return (
    <>
      <Drawer
        data={collection}
        open={displayDrawer}
        onClose={toggleDrawer}
        onSetRecording={handleSetRecording}
      />
      <Header
        title={recordingId}
        recording={recording}
        paused={paused}
        hasContexts={contexts.length > 0}
        progress={progress}
        collection={collection}
        onUpload={handleUpload}
        onDownload={handleDownload}
        onSettings={handleSettings}
        onStopRecording={handleStopRecoding}
        onStartRecording={handleStartRecording}
        onDeleteRecording={handleDeleteRecording}
        onToggleDrawer={toggleDrawer}
        onPause={handlePause}
        onPlay={handlePlay}
        onResume={handleResume}
        onReplay={handleReplay}
      />
      <Details
        data={contexts}
        anchor={anchorRef}
        recording={recording}
        isPlaying={progress > 0 && progress < 100}
        playingItemId={contexts[itemPlayingIndex]?.id}
        onSetContext={handleSetContext}
      />
      <Settings onClose={handleCloseSettings} open={showSettings} data={collection} />
    </>
  );
};

export default Layout;
