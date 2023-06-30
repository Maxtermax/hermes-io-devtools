import React, { useEffect, useState, useRef } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import * as contexts from "@contexts/Hermes";
import * as CONSTANTS from "@constants";
import observers from "@observers/Settings";
import Button from "@mui/material/Button";
import Notification from "@components/Notification/Notification";
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
        url: path,
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
        paddingTop: "10px",
        gridTemplateColumns: "1fr 80px",
        placeItems: "normal",
        gap: "15px",
      }}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <TextField
            variant="filled"
            placeholder="Path to sourcemap"
            onChange={handlePathChange}
            value={path}
            disabled={isLoading}
            maxRows={1}
          />
          <Button
            variant="outlined"
            aria-label="save"
            color="secondary"
            disabled={!hasPathReady || isLoading}
            size="large"
            onClick={handleConfirm}
          >
            Save
          </Button>
        </>
      )}
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
