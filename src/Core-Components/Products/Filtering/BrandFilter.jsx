import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import useGetNameAndBrand from "../../../Hooks/useGetNameAndBrand";
import { useDispatch } from "react-redux";
import { setBrand as setGlobalBrand } from "../../../store/brandSlice";
import { useState } from "react";

export default function BrandFilter() {
  const [brand, setBrand] = useState("");
  const dispatch = useDispatch();
  const { brands } = useGetNameAndBrand();

  const handleChange = (event) => {
    setBrand(event.target.value);
    dispatch(setGlobalBrand(event.target.value));
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Brand</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={brand}
          label="Brand"
          onChange={handleChange}
        >
          <MenuItem value={""} key={"all"}>
            Clear Choices
          </MenuItem>
          {brands.map((brand) => {
            return (
              <MenuItem value={brand} key={brand}>
                {brand}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
