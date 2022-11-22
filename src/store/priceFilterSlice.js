import { createSlice } from "@reduxjs/toolkit";

export const priceFilterSlice = createSlice({
  name: "priceFilter",
  initialState: {
    lessThan: 1500,
    greaterThan: 0,
  },
  reducers: {
    setLessThan: (state, payload) => {
      state.lessThan = payload.payload;
    },
    setGreaterThan: (state, payload) => {
      state.greaterThan = payload.payload;
    },
  },
});

export const { setLessThan,setGreaterThan } = priceFilterSlice.actions;
export const lessThanSelector = (state) => state.priceFilter.lessThan;
export const greaterThanSelector = (state) => state.priceFilter.greaterThan;
export default priceFilterSlice.reducer;
