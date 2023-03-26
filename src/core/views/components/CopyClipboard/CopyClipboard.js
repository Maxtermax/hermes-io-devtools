import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Tooltip from "@mui/material/Tooltip";
import Notification from "@components/Notification/Notification";

const CopyClipboard = (props = {}) => {
  const { onCopy = () => null } = props;
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (success) setTimeout(() => setSuccess(false), 3000);
  }, [success]);

  const handleCloseNotification = () => setSuccess(false);

  const handleCopy = () => {
    onCopy?.();
    setSuccess(true);
  };

  return (
    <>
      <Box
        sx={{
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          padding: "5px",
        }}
      >
        <Tooltip title="Copy to clipboard">
          <ContentCopyIcon onClick={handleCopy} />
        </Tooltip>
      </Box>
      <Notification open={success} text="Copy to clipboard" onClose={handleCloseNotification} />
    </>
  );
};

export default CopyClipboard;
