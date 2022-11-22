import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { FormControl, InputLabel, Select, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { setGreaterThan, setLessThan } from "../../../store/priceFilterSlice";

export default function PriceFilter() {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState([0, 1500]);

  const handleChange = (event, value) => {
    setValue(value);
  };
  const handleGlobalChange = () => {
    dispatch(setLessThan(value[1]));
    dispatch(setGreaterThan(value[0]));
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
      >
        <Box
          sx={{
            width: 280,
            height: 60,
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            // alignItems: "end",
            marginLeft: "5%",
          }}
        >
          <Typography sx={{ marginRight: "5%", color: "#2196f3" }}>
            Select Price:
          </Typography>
          <Slider
            getAriaLabel={() => "Temperature range"}
            value={value}
            onChange={handleChange}
            onChangeCommitted={handleGlobalChange}
            valueLabelDisplay="auto"
            min={0}
            max={1500}
          />
        </Box>
      </Select>
    </FormControl>
  );
}
