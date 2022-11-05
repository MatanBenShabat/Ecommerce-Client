import { createSlice } from "@reduxjs/toolkit";

export const brandSlice = createSlice({
  name: "brand",
  initialState: {
    brand: "",
  },
  reducers: {
    setBrand: (state, payload) => {
      state.brand = payload.payload;
    },
  },
});

export const { setBrand } = brandSlice.actions;
export const brandSelector = (state) => state.brand.brand;
export default brandSlice.reducer;
