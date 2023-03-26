import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import Divider from "@mui/material/Divider";
import PlayToggle from "./options/PlayToggle";
import PlayRecording from "./options/PlayRecording";
import Replay from "./options/Replay";
import Delete from "./options/Delete";
import StartToggle from "./options/StartToggle";
// import UploadRecording from "./options/UploadRecording";
import DrawerButton from "./options/DrawerButton";
import Settings from "./options/Settings";
import Title from "./Title";

const Header = (props = {}) => {
  const {
    recording = false,
    paused = false,
    hasContexts = false,
    progress = 0,
    onResume = () => {},
    onPlay = () => {},
    onPause = () => {},
    onReplay = () => {},
    onToggleDrawer = () => {},
    onSettings = () => {},
    onDeleteRecording = () => {},
    onStopRecording = () => {},
    onStartRecording = () => {},
    /* onUploadRecording = () => null,*/
  } = props;

  const isInProgress = progress > 0 && progress <= 100;
  const isProgressCompleted = progress === 100;
  const hasNoProgress = progress === 0;
  // const hasCollection = collection.length > 0;

  return (
    <AppBar position="fixed" sx={{ display: "grid" }}>
      {isInProgress && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress
            color="secondary"
            variant="determinate"
            value={progress}
          />
        </Box>
      )}
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingRight: "5px !important",
          paddingLeft: "30px !important",
        }}
      >
        <Stack direction="row" spacing={2}>
          {/*<DrawerButton onClick={onToggleDrawer} />*/}
          <Title />
        </Stack>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            padding: "4px",
            paddingLeft: "10px",
            paddingRight: "10px",
            borderRadius: "4px",
            transition: "all 0.35s ease-in-out",
          }}
        >
          {/*!recording && !isInProgress && (
            <UploadRecording onUploadRecording={onUploadRecording} />
          )*/}

          {!hasContexts && (
            <StartToggle
              recording={recording}
              onStartRecording={onStartRecording}
              onStopRecording={onStopRecording}
            />
          )}
          {hasContexts && (
            <>
              {isProgressCompleted && <Replay onReplay={onReplay} />}
              <Delete onDeleteRecording={onDeleteRecording} />
              {hasNoProgress && <PlayRecording onPlay={onPlay} />}
              {progress > 0 && progress < 100 && (
                <PlayToggle
                  paused={paused}
                  progress={progress}
                  onResume={onResume}
                  onPause={onPause}
                />
              )}
            </>
          )}
          <Divider orientation="vertical" flexItem />
          <Settings onClick={onSettings} />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
