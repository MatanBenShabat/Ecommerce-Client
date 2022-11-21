import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { FormControl, InputLabel, Select, Typography } from "@mui/material";

// function valuetext(value) {
//   // return `${value}°C`;
//   console.log(value);
// }

export default function PriceFilter() {
  // const dispatch = useDispatch();
  const [value, setValue] = React.useState([0, 1500]);
  
  const handleChange = (event, value) => {
    // console.log(value)
    // dispatch(setGlobalPriceFilter(newValue));
    setValue(value);
    // console.log(newValue);
    // const debouncedFunc = () => updateWeightValue(boostedLabel, newValue);
    // debounce(handleChange, 1000, {leading:false, trailing:true});
    // console.log([newValue?.target?.firstChild?.value,newValue?.target?.lastChild?.value]);
  };

  // const searchDelayed = 
  // React.useMemo(
  //   () => debounce(handleChange, 1),
  //   [handleChange]
  // );

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
            // defaultValue={[0, 1500]}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            // getAriaValueText={valuetext}
            min={0}
            max={1500}
          />
        </Box>
      </Select>
      {/* {console.log(value?.target?.firstChild?.value)} */}
    </FormControl>
  );
}
