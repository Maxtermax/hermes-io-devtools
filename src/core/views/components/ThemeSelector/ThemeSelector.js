/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import ActionsContext from "@contexts/Actions";
import ThemeContext from "@contexts/Theme";
import TranslationsContext from "@contexts/Translations";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import * as CONSTANTS from "@constants";

export default function ThemeSelector() {
  const { mode = "" } = useContext(ThemeContext);
  const { theme: themeObserver } = useContext(ActionsContext);
  const translations = useContext(TranslationsContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (lang = "") => {
    if (lang) {
      themeObserver.notify({ value: lang, from: CONSTANTS.componentsMap.ThemeSelector });
    }
    setAnchorEl(null);
  };

  return (
    <div>
      <MenuItem onClick={handleClick}>
        <Typography textAlign="center">
          {translations.theme}: {mode}
        </Typography>
      </MenuItem>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose(null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => handleClose(CONSTANTS.theme.modes.light)}>
          Light
        </MenuItem>
        <MenuItem onClick={() => handleClose(CONSTANTS.theme.modes.dark)}>
          Dark
        </MenuItem>
      </Menu>
    </div>
  );
}
