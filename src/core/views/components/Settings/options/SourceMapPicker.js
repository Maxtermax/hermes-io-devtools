import React, { useEffect, useState, useRef } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import * as contexts from "@contexts/Hermes";
import * as CONSTANTS from "@constants";
import observers from "@observers/Settings";
import Button from "@mui/material/Button";
import Notification from "@components/Notification/Notification";
import Typography from "@mui/material/Typography";
import Spinner from "../../Spinner/Spinner";
import useSelector from "@hooks/useSelector";
import { setItemFromLocalStorage } from "@utils/storage";

function useDefaultPath({ sourceMapPath, path, setPath }) {
  const refPath = useRef(null);
  useEffect(() => {
    const hasDefault = path === "" && refPath.current === "";
    // set default path
    if (sourceMapPath && hasDefault) {
      setPath(sourceMapPath);
    }
    refPath.current = path;
  }, [sourceMapPath, path, refPath, setPath]);
}

export default function SourceMapPicker({
  controller = new AbortController(),
}) {
  const [path, setPath] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [hasRequestFailed, setRequestFailed] = useState(false);
  const host = useSelector(contexts.selector, "host");
  const sourceMapPath = useSelector(
    contexts.selector,
    CONSTANTS.SOURCEMAP_PATH
  );

  useDefaultPath({ sourceMapPath, path, setPath });

  const hasPathReady = path !== "";

  const handlePathChange = (event = {}) => {
    const { target = {} } = event;
    const { value = "" } = target;
    setPath(value);
  };

  const handleCloseNotification = () => {
    setSuccess(false);
    setRequestFailed(false);
  };

  const handleConfirm = async () => {
    setLoading(true);
    const { error, success } = await observers.request.notify({
      context: contexts.sourceMapPicker,
      value: {
        controller,
        url: `${host}${path}`,
      },
    });
    setLoading(false);
    if (error) {
      console.log(error);
      setRequestFailed(true);
      return;
    }
    setSuccess(success);
    setItemFromLocalStorage(CONSTANTS.SOURCEMAP_PATH, path);
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{
        display: "grid",
        gridTemplateColumns: "0.3fr 0.6fr 80px",
        alignItems: "center",
        gap: "5px",
        justifyItems: "start",
      }}
    >
      <Typography>{host}</Typography>
      <TextField
        variant="standard"
        placeholder="Path to sourcemap"
        onChange={handlePathChange}
        value={path}
        disabled={isLoading}
        multiline
        maxRows={2}
      />
      {hasPathReady && !isLoading ? (
        <Button
          variant="outlined"
          aria-label="save"
          color="secondary"
          size="large"
          onClick={handleConfirm}
        >
          Save
        </Button>
      ) : null}
      {isLoading ? <Spinner /> : null}
      <Notification
        open={success}
        text="Sourcemap loaded"
        onClose={handleCloseNotification}
      />
      <Notification
        open={hasRequestFailed}
        severity="error"
        text="Failed to load sourcemap, please check the path"
        onClose={handleCloseNotification}
      />
    </Box>
  );
}
