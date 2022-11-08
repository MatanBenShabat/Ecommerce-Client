import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch } from "react-redux";
import { setSort as setGlobalSort  } from "../../../store/sortSlice";
import { useState } from "react";

export default function Sort() {
  const [sort, setSort] = useState("");
  const dispatch = useDispatch();
//   const sortValue = useSelector(sortSelector);

  const handleChange = (event) => {
    setSort(event.target.value);
    dispatch(setGlobalSort(event.target.value));
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sort</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sort}
          label="Brand"
          onChange={handleChange}
        >
          <MenuItem value={""} key={"all"}></MenuItem>
          <MenuItem value={"price"} key={1}>
            Price Low To High
          </MenuItem>
          <MenuItem value={"-price"} key={2}>
            Price High To Low
          </MenuItem>
          <MenuItem value={"rating"} key={3}>
            Rating
          </MenuItem>
          {/* <MenuItem value={sort} key={4}>
            What's New
          </MenuItem> */}
        </Select>
      </FormControl>
    </Box>
  );
}
