import React, { useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Notification(props = {}) {
  const {
    position = { vertical: "bottom", horizontal: "left" },
    text = "",
    severity = "success",
    open = false,
    onClose = () => {}
  } = props;

  useEffect(() => {
    const intervalId = setTimeout(() => {
      onClose?.();
    }, 2000);
    return () => clearInterval(intervalId);
  }, [onClose, open]);

  return (
    <Snackbar
      anchorOrigin={position}
      open={open}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {text}
      </Alert>
    </Snackbar>
  );
}
