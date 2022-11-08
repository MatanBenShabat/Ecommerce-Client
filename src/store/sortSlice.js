import { createSlice } from "@reduxjs/toolkit";

export const sortSlice = createSlice({
  name: "sort",
  initialState: {
    sort: "",
  },
  reducers: {
    setSort: (state, payload) => {
      state.sort = payload.payload;
    },
  },
});

export const { setSort } = sortSlice.actions;
export const sortSelector = (state) => state.sort.sort;
export default sortSlice.reducer;
