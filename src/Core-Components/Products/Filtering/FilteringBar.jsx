import { Stack } from "@mui/material";
import React, { Fragment } from "react";
import BrandFilter from "./BrandFilter";
import PriceFilter from "./PriceFilter";

function FilteringBar() {
  return (
    <Fragment>
      <h2>Filtering:</h2>
      <Stack direction="row" spacing={2}>
      <PriceFilter/>
      <BrandFilter/>
    </Stack>
    </Fragment>
  );
}

export default FilteringBar;
