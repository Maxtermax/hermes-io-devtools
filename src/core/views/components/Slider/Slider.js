import * as React from 'react';
import Box from '@mui/material/Box';
import MuiSlider from '@mui/material/Slider';

function valuetext(value) {
  return `${value}`;
}

const Slider = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <MuiSlider
        defaultValue={30}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        step={10}
        marks
        min={1000}
        max={5000}
      />
    </Box>
  );
};

export default Slider;

