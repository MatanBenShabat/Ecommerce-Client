import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

export default function RadioButtonsGroup({type}) {
  return (
    <FormControl>
      {/* <FormLabel id="demo-radio-buttons-group-label">Type</FormLabel> */}
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
        <FormControlLabel disabled checked={type === "seller"} value="female" control={<Radio />} label="Seller" />
        <FormControlLabel disabled checked={type === "customer"} value="male" control={<Radio />} label="Customer" />
      </RadioGroup>
    </FormControl>
  );
}