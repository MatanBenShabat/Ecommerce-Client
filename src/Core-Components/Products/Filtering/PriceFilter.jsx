import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { FormControl, InputLabel, Select, Typography } from "@mui/material";

function valuetext(value) {
  return `${value}°C`;
}

export default function PriceFilter() {
  const [value, setValue] = React.useState([0, 1000]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Sort Price</InputLabel>
      <Select
        sx={{ width: 300 }}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={""}
        label="Sort Price"
        // onChange={handleChange}
      >
        <Box
          sx={{
            width: 280,
            height: 60,
            display: "flex",
            flexDirection:"column",
            textAlign:"center",
            // alignItems: "end",
            marginLeft: "5%",
          }}
        >
          <Typography sx={{marginRight:"5%",color:"#2196f3"}}>Select Price:</Typography>
          <Slider
            getAriaLabel={() => "Temperature range"}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            min={0}
            max={1500}
          />
        </Box>
      </Select>
    </FormControl>
  );
}
