import { createSlice } from "@reduxjs/toolkit";

export const priceFilterSlice = createSlice({
  name: "priceFilter",
  initialState: {
    priceFilter: [0,1500],
  },
  reducers: {
    setPriceFilter: (state, payload) => {
      state.priceFilter = payload.payload;
    },
  },
});

export const { setPriceFilter } = priceFilterSlice.actions;
export const priceFilterSelector = (state) => state.priceFilter.priceFilter;
export default priceFilterSlice.reducer;
