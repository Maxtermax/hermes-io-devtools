import { createTheme } from '@mui/material/styles';
import Dark from "@theme/adapters/Dark";
import Light from "@theme/adapters/Light";
import { theme } from "@constants";

const ThemeFactory = (mode = '') => {
  if (mode === theme.modes.dark) {
    return createTheme(new Dark());
  }
  if (mode === theme.modes.light) {
    return createTheme(new Light());
  }
  return new Dark();
}

export default ThemeFactory;
