import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import SourceMapPicker from "./options/SourceMapPicker";
import { Typography } from "@mui/material";

function Settings(props = {}) {
  const { open = false } = props;
  return (
    <div>
      <Dialog open={open} onClose={props.onClose}>
        <DialogTitle
          sx={{
            paddingBottom: "0px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "15px",
          }}
        >
          <Typography>Settings</Typography>
          <IconButton color="secondary" component="label" onClick={props.onClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ width: "600px" }}>
          <SourceMapPicker />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Settings;
