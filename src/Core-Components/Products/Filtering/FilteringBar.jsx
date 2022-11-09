import { Box, Stack } from "@mui/material";
import BrandFilter from "./BrandFilter";
import PriceFilter from "./PriceFilter";
import Sort from "./Sort";

function FilteringBar() {
  return (
    <Box sx={{border:"solid 1px gray",padding:"2% 5% 2% 5%",marginTop:"20px",boxShadow:"0px 3px 3px 2px gray"}}>
      <Stack direction="row" spacing={2}>
        <PriceFilter />
        <BrandFilter />
        <Sort/>
      </Stack>
    </Box>
  );
}

export default FilteringBar;
