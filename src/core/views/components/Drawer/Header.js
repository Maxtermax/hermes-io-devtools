import React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import HistoryIcon from "@mui/icons-material/History";

const Header = () => {
  return (
    <Box
      sx={{
        borderTop: (theme) => `3px solid ${theme.palette.secondary}`,
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          gap: "4px",
          justifyContent: "flex-start",
          alignItems: "center",
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
      >
        <IconButton color="secondary">
          <HistoryIcon />
        </IconButton>
        <Typography variant="h6" color="secondary">
          History
        </Typography>
      </Box>
    </Box>
  );
};

export default Header;
